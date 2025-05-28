import { redirect } from "next/navigation";

import { connectDB } from "@/server/config/database";
import { NextRequest } from "next/server";

const minxyGoDaddy =
  "https://www.godaddy.com/en-ie/domainsearch/find?domainToCheck=minxy.dev&tmskey=sem_godaddy_brand";

export async function GET(req: NextRequest) {
  await connectDB();

  console.log("\nrequest\n", req.url, "\n");

  return Response.redirect(minxyGoDaddy);

  // get url from params.shortId, fetch from database and redirect to the original url
  return Response.json({
    message: "url found",
    data: { id: "id" },
  });
}
