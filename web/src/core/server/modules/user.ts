import { auth } from "@clerk/nextjs/server";
import connectDB from "../config/database";

export async function UserHandler() {
  await connectDB();

  const { userId } = await auth();

  if (!userId) return { message: "No user" }
}