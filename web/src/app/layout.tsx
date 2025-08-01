import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { NavBar } from "@/components/molecules/common";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { environment } from "@/core/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appName = "Minxy";
const appDescription =
  "Simplify and optimize your links with our powerful link shortener. Track performance, manage custom URLs, and share with ease—all in one platform. Perfect for social media, marketing, and analytics.";

export const metadata: Metadata = {
  title: {
    template: `%s | ${appName}`,
    default: appName,
  },

  description: appDescription,
  metadataBase: new URL(environment.frontEndUrl!),
  openGraph: {
    type: "website",
    siteName: "appName",
    description: appDescription,
    title: {
      template: `%s | ${appName}`,
      default: appName,
    },
  },

  twitter: {
    card: "summary",
    creator: "@wah_vanessa",
    description: appDescription,
    title: {
      template: `%s | ${appName}`,
      default: appName,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: `%s | ${appName}`,
  },

  authors: [
    {
      url: "https://github.com/vanessa082",
      name: "Wah Vanessa",
    },
  ],

  keywords: [
    "link shortener",
    "URL shortener",
    "track links",
    "analytics",
    "custom URLs",
    "shorten links",
    "free link shortener",
    "link management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={environment.clerk.publishableKey}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
