import { HeroSection } from "@/components/molecules/home/hero-section";
import {
  CurrentUserProvider,
  type WithCurrentUserComponentProps,
} from "@/features/providers/current-user";

async function _HomePage(props: WithCurrentUserComponentProps) {
  return (
    <main className="relative overflow-hidden min-h-screen bg-background text-foreground">
      <HeroSection user={props?.user} />

    </main>
  );
}

export const HomePage = CurrentUserProvider(_HomePage);

