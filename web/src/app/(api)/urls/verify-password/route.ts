import { connectDB } from "@/server/config/database";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  connectDB();
  // const shortId = 
}