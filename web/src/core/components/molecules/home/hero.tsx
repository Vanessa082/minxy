import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="px-6 pt-24 pb-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            Smart. Secure. <br /> Simple URL Shortener.
          </h1>
          <p className="text-lg text-muted-foreground">
            Create clean links, protect them with passwords, and track analytics — all in one simple tool.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/sign-in"
              className="px-6 py-3 rounded-full bg-app-blue-500 text-white hover:opacity-90 transition shadow"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="px-6 py-3 rounded-full border border-border hover:bg-muted transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full h-auto relative"
        >
          <Image
            src="/screen.png"
            alt="Minxy Dashboard"
            className="rounded-xl shadow-lg"
            width={800}
            height={500}
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}