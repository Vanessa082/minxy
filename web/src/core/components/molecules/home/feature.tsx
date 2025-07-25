import { BarChart, LockIcon, Repeat } from "lucide-react";

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
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

export function Features() {
  return (
    <section
      id="features"
      className="px-6 pb-24 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <FeatureCard
        icon={<LockIcon className="w-5 h-5" />}
        title="Password Protection"
        desc="Secure links with passwords so only the right people can access them."
      />
      <FeatureCard
        icon={<BarChart className="w-5 h-5" />}
        title="Real-Time Analytics"
        desc="Track clicks, locations, and referrers in real-time."
      />
      <FeatureCard
        icon={<Repeat className="w-5 h-5" />}
        title="Link History"
        desc="Organize, manage, and delete links with ease."
      />
    </section>
  );
}
