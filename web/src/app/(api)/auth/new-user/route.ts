import {
  onboardingFormSchema,
  type OnboardingPageForm,
} from "@/core/schema/onboarding";
import { newPrefixedId } from "@/lib/id";
import { connectDB } from "@/server/config/database";
import { userRepo } from "@/server/repository/user.repo";
import { newBadRequestApiResponse } from "@/server/req-res";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  const body = (await req.json()) as OnboardingPageForm;

  const { data, error } = onboardingFormSchema.safeParse(body);

  if (error || !Object.keys(data).length) {
    return newBadRequestApiResponse({
      message: "Error",
      data: null,
      headers: {
        "Set-Cookie":
          'notification="error failed to validate data"; notificationStatus=error; path=/',
      },
    });
  }

  const prev = await userRepo.getByClerkId(data.clerkId);

  if (prev) {
    redirect("/app");
  }

  await userRepo.create({
    id: newPrefixedId("user"),
    clerkId: data.clerkId,
    email: data.email,
    name: data.name,
  });

  redirect("/app");
}
