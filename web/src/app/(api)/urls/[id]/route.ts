// import { completeUrlRequestSchema, CompleteUrlRequestSchema } from "@/core/schema/url";
// import { connectDB } from "@/server/config/database";
// import { urlRepo } from "@/server/repository/url.repo";
// import { newBadRequestApiResponse, newSuccessApiResponse } from "@/server/req-res";
// import { NextRequest } from "next/server";

// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   await connectDB();
//   const body = (await req.json()) as CompleteUrlRequestSchema;

//   const result = completeUrlRequestSchema.parse(body);
//   if (!result) {
//     return newBadRequestApiResponse({
//       message: "Validation failed",
//       data: null,
//     });
//   }

//   const updatedUrl = await urlRepo.updateUrl(params.id, result);

//   return newSuccessApiResponse({
//     message: "URL successfully posted",
//     data: updatedUrl,
//   });
// };
