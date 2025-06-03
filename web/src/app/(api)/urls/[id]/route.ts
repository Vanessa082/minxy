import { URLShortenerDto, urlShortenerDtoSchema } from "@/core/schema/url";
import { connectDB } from "@/server/config/database";
import { newBadRequestApiResponse } from "@/server/req-res";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = (await req.json()) as URLShortenerDto;

  const result = urlShortenerDtoSchema.parse(body);
  if (!result) {
    return newBadRequestApiResponse({
      message: "Validation failed",
      data: null,
    });
  }

  // const updatedUrl = await urlRepo.updatedUrl()
};
