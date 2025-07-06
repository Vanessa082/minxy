import {
  completeUrlRequestSchema,
  CompleteUrlRequestSchema,
} from "@/core/schema/url";
import { connectDB } from "@/server/config/database";
import { urlRepo } from "@/server/repository/url.repo";
import {
  newBadRequestApiResponse,
  newSuccessApiResponse,
} from "@/server/req-res";
import { genSaltSync, hashSync } from "bcrypt";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = (await req.json()) as CompleteUrlRequestSchema;

  await connectDB();

  if (!body.password?.trim()) {
    const updatedUrl = await urlRepo.updateUrl(id, { password: "" });
    return newSuccessApiResponse({
      message: "URL unlocked",
      data: updatedUrl,
    });
  }

  const result = completeUrlRequestSchema.parse(body);

  if (!result) {
    return newBadRequestApiResponse({
      message: "Validation failed",
      data: null,
    });
  }

  if (result.password) {
    const salt = genSaltSync(12);
    result.password = hashSync(result.password, salt);
  }

  const updatedUrl = await urlRepo.updateUrl(id, result);

  return newSuccessApiResponse({
    message: "URL successfully updated",
    data: updatedUrl,
  });
}
