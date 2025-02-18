import { connectDB } from "@/server/config/database";
import { userRepo } from "@/server/repository/user.repo";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  await connectDB();

  const { userId } = await auth();

  const userNotFound = () => {
    return Response.json(
      {
        message: "User not found",
        data: {},
      },
      {
        status: 404,
      },
    );
  };

  if (!userId) {
    return userNotFound();
  }

  const user = await userRepo.getByClerkId(userId);

  if (!user) {
    return userNotFound();
  }

  return Response.json({
    message: "User found",
    data: user,
  });
}
