export function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 border rounded-xl bg-card hover:shadow-lg transition-all">
      <div className="w-10 h-10 flex items-center justify-center bg-app-blue-500/10 text-app-blue-500 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}