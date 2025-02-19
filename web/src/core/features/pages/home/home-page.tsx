import { HeroSection } from "@/components/molecules/home/hero-section";
import {
  CurrentUserProvider,
  type WithCurrentUserComponentProps,
} from "@/features/providers/current-user";

function _HomePage(props: WithCurrentUserComponentProps) {
  console.log({ props });

  return (
    <div className="w-full">
      <HeroSection />
      home page
    </div>
  );
}

export const HomePage = CurrentUserProvider(_HomePage);
