import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/index.css";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "DriveNow | Premium car rental marketplace",
  description: "Browse, book, and manage premium rental cars from verified partners.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
