import Link from "next/link";

export const metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFoundPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-foreground px-6 relative overflow-hidden">
      <div
        className="text-center space-y-6 max-w-xl"
      >
        <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-app-blue-500 text-white rounded-full shadow hover:scale-105 transition"
        >
          ⬅ Back to Home
        </Link>
      </div>
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
