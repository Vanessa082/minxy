import { connectDB } from "@/server/config/database";
import { notFound, redirect } from "next/navigation";
import { urlRepo } from "@/server/repository/url.repo";

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
}

export default async function Page(props: paramsProps) {
  const { shortId } = await props.params;

  if (!shortId) {
    notFound();
  }

  await connectDB();

  const url = await urlRepo.getByShortId(shortId);

  if (!url || !url.original) notFound();

  if (url.password) {
    const shortId = url.shortId;
    redirect(`/app/url-gate-way/${shortId}`);
  }

  redirect(url.original);
}
