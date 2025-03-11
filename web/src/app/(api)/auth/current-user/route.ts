import { connectDB } from "@/server/config/database";
import { userRepo } from "@/server/repository/user.repo";
import {
  newNotFoundApiResponse,
  newSuccessApiResponse,
} from "@/server/req-res";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;

  const clerkAuth = await auth();

  const clerkId = clerkAuth.userId || searchParams.get("clerkId");

  if (!clerkId) {
    return newNotFoundApiResponse({
      message: "User not found",
      data: null,
    });
  }

  await connectDB();

  const user = await userRepo.getByClerkId(clerkId);

  if (!user) {
    return newNotFoundApiResponse({
      message: "User not found",
      data: null,
    });
  }

  return newSuccessApiResponse({
    message: "User found",
    data: user,
  });
}
