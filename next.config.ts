import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:locale(en|fr|ar)/assets/:path*",
          destination: "/assets/:path*",
        },
        {
          source: "/:locale(en|fr|ar)/cv/:path*",
          destination: "/cv/:path*",
        },
        {
          source: "/:locale(en|fr|ar)/Abdelilah-Wajid.png",
          destination: "/assets/profile/abdelilah-wajid.png",
        },
        {
          source: "/:locale(en|fr|ar)/electro-abidin/:path*",
          destination: "/assets/work/electro-abidin/:path*",
        },
        {
          source: "/:locale(en|fr|ar)/favicon.ico",
          destination: "/favicon.ico",
        },
        {
          source: "/Abdelilah-Wajid.png",
          destination: "/assets/profile/abdelilah-wajid.png",
        },
        {
          source: "/qr-portfolio.png",
          destination: "/assets/profile/qr-portfolio.png",
        },
        {
          source: "/Abdelilah_Wajid_CV.pdf",
          destination: "/assets/documents/cv/abdelilah-wajid.pdf",
        },
        {
          source: "/Abdelilah_Wajid_CV_EN.pdf",
          destination: "/assets/documents/cv/abdelilah-wajid-en.pdf",
        },
        {
          source: "/Abdelilah_Wajid_CV_FR.pdf",
          destination: "/assets/documents/cv/abdelilah-wajid-fr.pdf",
        },
        {
          source: "/Abdelilah_Wajid_CV_AR.pdf",
          destination: "/assets/documents/cv/abdelilah-wajid-ar.pdf",
        },
        {
          source: "/demo.gif",
          destination: "/assets/work/electro-abidin/demo.gif",
        },
        {
          source: "/electro-abidin/:path*",
          destination: "/assets/work/electro-abidin/:path*",
        },
        {
          source: "/cv-abdelilah-wajid.html",
          destination: "/cv/en.html",
        },
        {
          source: "/cv-abdelilah-wajid-fr.html",
          destination: "/cv/fr.html",
        },
        {
          source: "/cv-abdelilah-wajid-ar.html",
          destination: "/cv/ar.html",
        },
      ],
    };
  },
  turbopack: {},
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
