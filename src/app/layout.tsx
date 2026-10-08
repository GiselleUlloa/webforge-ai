import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebForge AI",
  description: "Free and open-source AI website builder.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
