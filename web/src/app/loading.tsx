export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-app-blue-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-app-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-muted-foreground animate-pulse font-medium">
        Gathering your data...
      </p>
    </div>
  );
}