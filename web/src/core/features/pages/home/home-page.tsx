import { HeroSection } from "@/components/molecules/home/hero-section";
import {
  CurrentUserProvider,
  type WithCurrentUserComponentProps,
} from "@/features/providers/current-user";

async function _HomePage(props: WithCurrentUserComponentProps) {
  return (
    <div className="w-full">
      <HeroSection user={props?.user} />
    </div>
  );
}

export const HomePage = CurrentUserProvider(_HomePage);
