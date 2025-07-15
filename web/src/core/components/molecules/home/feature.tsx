import { BarChart, LockIcon, Repeat } from "lucide-react";
import { FeatureCard } from "./feature-card";

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
