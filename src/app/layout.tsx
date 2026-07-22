import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { UIStoreProvider } from "@/stores/ui-store";
import { ThemeRoot } from "./ThemeRoot";
import { WarmResume } from "@/components/WarmResume";
import { profile } from "@/data/resume";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UIStoreProvider>
          <ThemeRoot>{children}</ThemeRoot>
        </UIStoreProvider>
        <WarmResume />
      </body>
    </html>
  );
}
