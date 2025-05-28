import { connectDB } from "@/server/config/database";
import { UserDocument } from "@/server/models/user";
import { urlRepo } from "@/server/repository/url.repo";
import { userRepo } from "@/server/repository/user.repo";
import { newBadRequestApiResponse, newSuccessApiResponse } from "@/server/req-res";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest
) {
  await connectDB();
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return newBadRequestApiResponse({
      message: "No authenticated user yet",
      data: null,
    })
  }
  const user = await userRepo.getByClerkId(clerkId) as UserDocument | null;
  if (!user) {
    return newBadRequestApiResponse({
      message: "No authenticated user yet",
      data: null,
    })
  }

  const urls = await urlRepo.getAllUrlByUserId(user.id);
  return newSuccessApiResponse({
    message: "URL successfully posted",
    data: urls,
  });
}