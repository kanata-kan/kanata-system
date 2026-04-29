"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { X, Download, Sparkles } from "lucide-react";

interface InstallPromptData {
  visitCount: number;
  lastShown: number;
  dismissedCount: number;
  lastDismissed: number;
}

const STORAGE_KEY = "pwa-install-prompt";
const VISIT_THRESHOLD = 2; // Show after 2 visits
const DISMISSAL_COOLDOWN = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
const ENGAGEMENT_DELAY = 30000; // 30 seconds

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [hasEngaged, setHasEngaged] = useState(false);
  const [installStatus, setInstallStatus] = useState<
    "prompt" | "installing" | "success" | null
  >(null);
  const currentTimeRef = useRef(0);

  // Update current time periodically
  useEffect(() => {
    const interval = setInterval(() => {
      currentTimeRef.current = Date.now();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load and manage install prompt data
  const getPromptData = useCallback((): InstallPromptData => {
    if (typeof window === "undefined") {
      return {
        visitCount: 0,
        lastShown: 0,
        dismissedCount: 0,
        lastDismissed: 0,
      };
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data
        ? JSON.parse(data)
        : { visitCount: 0, lastShown: 0, dismissedCount: 0, lastDismissed: 0 };
    } catch {
      return {
        visitCount: 0,
        lastShown: 0,
        dismissedCount: 0,
        lastDismissed: 0,
      };
    }
  }, []);

  const updatePromptData = useCallback(
    (updates: Partial<InstallPromptData>) => {
      const current = getPromptData();
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [getPromptData],
  );

  // Track visit count on mount
  useEffect(() => {
    const data = getPromptData();
    updatePromptData({ visitCount: data.visitCount + 1 });
  }, [getPromptData, updatePromptData]);

  // Track user engagement (scroll or time)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHasEngaged(true);
      }
    };

    const timer = setTimeout(() => {
      setHasEngaged(true);
    }, ENGAGEMENT_DELAY);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Determine if we should show the prompt
  useEffect(() => {
    if (!isInstallable || isInstalled) {
      setTimeout(() => setIsVisible(false), 0);
      return;
    }

    const data = getPromptData();
    const now = Date.now();
    const timeSinceLastDismissal = now - data.lastDismissed;
    const isCooldownOver = timeSinceLastDismissal > DISMISSAL_COOLDOWN;
    const hasReachedVisitThreshold = data.visitCount >= VISIT_THRESHOLD;

    // Don't show if recently dismissed
    if (!isCooldownOver && data.dismissedCount > 0) {
      return;
    }

    // Show only after engagement and visit threshold
    if (hasEngaged && hasReachedVisitThreshold) {
      // Add a small delay for smoother UX
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        updatePromptData({ lastShown: now });
      }, 2000);

      return () => clearTimeout(showTimer);
    }
  }, [isInstallable, isInstalled, hasEngaged, getPromptData, updatePromptData]);

  const handleInstall = async () => {
    setInstallStatus("installing");
    const success = await promptInstall();

    if (success) {
      setInstallStatus("success");
      // Track analytics
      trackInstallEvent("accepted");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
        setInstallStatus(null);
      }, 3000);
    } else {
      setInstallStatus(null);
    }
  };

  const handleDismiss = () => {
    const data = getPromptData();
    updatePromptData({
      dismissedCount: data.dismissedCount + 1,
      lastDismissed: currentTimeRef.current,
    });
    setIsVisible(false);
    trackInstallEvent("dismissed");
  };

  const trackInstallEvent = useCallback(
    (action: "accepted" | "dismissed" | "shown") => {
      // Analytics tracking - replace with your analytics solution
      console.log(`[PWA Install] ${action}`, {
        visitCount: getPromptData().visitCount,
        timestamp: new Date().toISOString(),
      });

      // Example: Google Analytics
      // if (typeof gtag !== "undefined") {
      //   gtag("event", "pwa_install", {
      //     action,
      //     visit_count: getPromptData().visitCount,
      //   });
      // }

      // Example: Plausible
      // if (typeof plausible !== "undefined") {
      //   plausible("PWA Install", {
      //     props: { action, visit_count: getPromptData().visitCount },
      //   });
      // }
    },
    [getPromptData],
  );

  // Track when prompt is shown
  useEffect(() => {
    if (isVisible && installStatus === "prompt") {
      trackInstallEvent("shown");
    }
  }, [isVisible, installStatus, trackInstallEvent]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-100 z-50"
        >
          <div className="bg-[#0e1117] border border-[#22d3ee]/20 rounded-2xl p-5 shadow-2xl shadow-[#22d3ee]/10 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="shrink-0">
                <div className="w-12 h-12 bg-linear-to-br from-[#22d3ee] to-[#0891b2] rounded-xl flex items-center justify-center">
                  {installStatus === "success" ? (
                    <Sparkles className="w-6 h-6 text-white" />
                  ) : (
                    <Download className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm mb-1">
                  {installStatus === "success"
                    ? "Installed successfully"
                    : "Install this app"}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">
                  {installStatus === "success"
                    ? "You can now access this portfolio offline with a native app experience."
                    : "Get faster access and offline support. Add to your home screen for a native experience."}
                </p>

                {installStatus !== "success" && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleInstall}
                      disabled={installStatus === "installing"}
                      className="flex-1 bg-[#22d3ee] hover:bg-[#0891b2] text-[#0e1117] font-medium text-xs px-4 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {installStatus === "installing"
                        ? "Installing..."
                        : "Install App"}
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="px-3 py-2.5 text-gray-400 hover:text-white text-xs transition-colors"
                    >
                      Not now
                    </button>
                  </div>
                )}
              </div>

              {/* Close button */}
              {installStatus !== "success" && (
                <button
                  onClick={handleDismiss}
                  className="shrink-0 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
