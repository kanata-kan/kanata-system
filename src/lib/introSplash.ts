export const INTRO_SPLASH_COOKIE = "aw-intro-session";
export const INTRO_SPLASH_VERSION = "v3";
export const INTRO_SPLASH_STORAGE_KEY = `${INTRO_SPLASH_COOKIE}:${INTRO_SPLASH_VERSION}`;

export function hasSeenIntroSplash(value?: string | null) {
  return value === INTRO_SPLASH_VERSION;
}
