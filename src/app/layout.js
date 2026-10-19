import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import { connection } from "next/server";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api").replace(/\/+$/, "");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  let settings = null;
  try {
    const response = await fetch(`${API_URL}/settings`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (response.ok) settings = (await response.json()).data;
  } catch {
    // Use the existing site identity while the API is unavailable.
  }

  const title = settings?.site_title || "Katharine Pharmaceuticals Private Limited, Jaipur";
  const description = settings?.site_description || "Trader - Wholesaler / Distributor of Animal Feed Supplement, Mineral Mixture & Liquid Calcium offered by Katharine Pharmaceuticals Private Limited from Jaipur, Rajasthan, India";
  const keywords = String(settings?.site_keywords || "").split(",").map((keyword) => keyword.trim()).filter(Boolean);

  return { title, description, ...(keywords.length ? { keywords } : {}) };
}

async function SiteMetadataMarker() {
  await connection();
  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Loader />
          {children}
          <Suspense><SiteMetadataMarker /></Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
