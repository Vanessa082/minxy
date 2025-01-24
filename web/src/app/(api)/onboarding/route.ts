import {
  onboardingFormSchema,
  type OnboardingPageForm,
} from "@/core/schema/onboarding";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as OnboardingPageForm;

  const { data, error } = onboardingFormSchema.safeParse(body);

  if (error) {
    return redirect("/onboarding");
  }

  console.log(data, error);

  redirect("/app");

  // return Response.json({
  //   message: "Success",
  //   data: body
  // }, {
  //   status: 300,
  // });
}
