"use client";

import Link from "next/link";
import { motion } from "motion/react"

export default function NotFoundPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-foreground px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-6 max-w-xl"
      >
        <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-app-blue-500 text-white rounded-full shadow hover:scale-105 transition"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>
      <BackgroundBlobs />
    </main>
  );
}

function BackgroundBlobs() {
  return (
    <>
      <div className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-app-blue-500/30 blur-[160px] rounded-full z-[-1]" />
      <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-app-blue-500/20 blur-[120px] rounded-full z-[-1]" />
    </>
  );
}
