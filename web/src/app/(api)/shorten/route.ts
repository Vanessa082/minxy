import { URLShortenerInputField, urlShortenerRequestSchema, } from "@/core/schema/url";
import { newPrefixedId, newShortId } from "@/lib/id";
import { connectDB } from "@/server/config/database";
import { UrlStatus } from "@/server/models/url";
import { urlRepo } from "@/server/repository/url.repo";
import {
  newBadRequestApiResponse,
  newSuccessApiResponse,
} from "@/server/req-res";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = (await req.json()) as URLShortenerInputField;

  const result = urlShortenerRequestSchema.safeParse(body);

  if (!result.success) {
    return newBadRequestApiResponse({
      message: "Validation Failed",
      data: null,
    });
  }

  const { original, userId } = result.data;

  const existingURL = await urlRepo.findByOriginalAndUser(original, userId);

  if (existingURL) {
    return newSuccessApiResponse({
      message: "URL already exist",
      data: existingURL,
    });
  }

  const newURL = await urlRepo.create({
    id: newPrefixedId("url"),
    original,
    shortId: newShortId(),
    userId,
    clicks: 0,
    status: UrlStatus.active,
  });

  if (!newURL) {
    return newBadRequestApiResponse({
      message: "Failed to post URL",
      data: null,
    });
  }

  return newSuccessApiResponse({
    message: "URL successfully posted",
    data: newURL,
  });
}
