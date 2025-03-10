import { HeroSection } from "@/components/molecules/home/hero-section";
import {
  CurrentUserProvider,
  type WithCurrentUserComponentProps,
} from "@/features/providers/current-user";
import { Fetcher } from "@/lib/fetch";
import { UserDocument } from "@/server/models/user";
import { auth } from "@clerk/nextjs/server";

async function _HomePage(props: WithCurrentUserComponentProps) {
  console.log({ props });

  const r = await Fetcher<UserDocument | null>("/auth/current-user");

  const { userId } = await auth();

  return (
    <div className="w-full">
      <pre>
        {JSON.stringify({ userId, r }, null, 2)}
      </pre>
      <HeroSection />
    </div>
  );
}

export const HomePage = CurrentUserProvider(_HomePage);
