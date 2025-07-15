export function BackgroundBlobs() {
  return (
    <>
      <div className="absolute -top-32 -left-40 w-[500px] h-[500px] bg-app-blue-500/30 blur-[160px] rounded-full z-[-1]" />
      <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-app-blue-500/20 blur-[120px] rounded-full z-[-1]" />
    </>
  );
}