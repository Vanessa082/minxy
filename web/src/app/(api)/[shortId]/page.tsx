import { connectDB } from "@/server/config/database";
import { notFound, redirect } from "next/navigation";
import { urlRepo } from "@/server/repository/url.repo";
import { headers } from "next/headers";
import { VisitModel } from "@/server/models/visit";
import { UAParser } from "ua-parser-js";
import crypto from "crypto";

// const minxyGoDaddy =
//   "https://www.godaddy.com/en-ie/domainsearch/find?domainToCheck=minxy.dev&tmskey=sem_godaddy_brand";

// export async function GET(req: NextRequest) {

// const shortId = getShortIdFromUrl(req.url);

//   if (!shortId) {
//     notFound();
//   }

//   await connectDB();

//   const url = await urlRepo.getByShortId(shortId);

//   if (!url || !url.original) notFound();

//   if (url.password) {
//     redirect('/url-gate-way?id=' + url.shortId);
//   }

//   return Response.redirect(url.original);
// }

export interface paramsProps {
  params: Promise<{ shortId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: paramsProps) {
  const { shortId } = await props.params;
  const searchParams = await props.searchParams;

  if (!shortId) {
    notFound();
  }

  await connectDB();

  const url = await urlRepo.getByShortId(shortId);

  if (!url || !url.original) notFound();

  // --- Analytics Collection ---
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(',')[0] || ""
  const userAgent = headersList.get("user-agent") || "";
  const referrer = headersList.get("referer") || "Direct";

  const parser = new UAParser(userAgent);
  const deviceType = parser.getDevice().type || "desktop";
  const browserName = parser.getBrowser().name || "Unknown";
  const osName = parser.getOS().name || "Unknown";

  const utm_source = typeof searchParams.utm_source === 'string' ? searchParams.utm_source : undefined;
  const utm_medium = typeof searchParams.utm_medium === 'string' ? searchParams.utm_medium : undefined;
  const utm_campaign = typeof searchParams.utm_campaign === 'string' ? searchParams.utm_campaign : undefined;

  const visitorHash = crypto
    .createHash('sha256')
    .update(ip + userAgent)
    .digest("hex");

  VisitModel.create({
    urlId: url.id,
    shortId: url.shortId,
    visitorHash,
    device: deviceType,
    browser: browserName,
    os: osName,
    referrer: referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    timestamp: new Date(),
  }).catch((err) => console.error("Analytics Log Error:", err));

  if (url.password) {
    const shortId = url.shortId;
    redirect(`/app/url-gate-way/${shortId}`);
  }

  redirect(url.original);
}