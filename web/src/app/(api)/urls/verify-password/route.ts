import { VerifyUrlInput } from "@/core/schema/url";
import { connectDB } from "@/server/config/database";
import { urlRepo } from "@/server/repository/url.repo";
import { newBadRequestApiResponse, newSuccessApiResponse } from "@/server/req-res";
import { compareSync } from "bcrypt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  connectDB();
  const { shortId, password } = (await req.json()) as VerifyUrlInput;
  const url = await urlRepo.getByShortId(shortId);

  if (!url?.password) {
    return newBadRequestApiResponse({
      message: "Password does not exist",
      data: null
    })
  }

  const matchPassword = compareSync(password, url.password);

  if (!matchPassword) {
    return newBadRequestApiResponse({
      message: "Incorrect Password",
      data: null
    })
  }

  return newSuccessApiResponse({
    message: "Password is correct",
    data: url
  })
}