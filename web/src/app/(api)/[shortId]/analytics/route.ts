import { visitRepo } from "@/server/repository/visit.repo";
import { connectDB } from "@/server/config/database";
import { newSuccessApiResponse, newBadRequestApiResponse } from "@/server/req-res";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ shortId: string }> }) {
  try {
    await connectDB();
    const { shortId } = await params;
    const searchParams = req.nextUrl.searchParams;

    const start = searchParams.get("start") ? new Date(searchParams.get("start")!) : undefined;
    const end = searchParams.get("end") ? new Date(searchParams.get("end")!) : undefined;

    const result = await visitRepo.getFullDecisionSuite(shortId, start, end);
    const analytics = result[0];

    return newSuccessApiResponse({
      message: "Analytics loaded",
      data: {
        summary: analytics.summary[0] || { totalClicks: 0, uniqueClicks: 0 },
        timeSeries: analytics.timeSeries,
        breakdown: {
          devices: analytics.devices,
          browsers: analytics.browsers,
          os: analytics.os,
          countries: analytics.countries,
          referrers: analytics.referrers,
          utmSources: analytics.utmSources,
        }
      }
    });
  } catch (error) {
    console.log(error)
    return newBadRequestApiResponse({
      message: "Internal Error",
      data: null
    });
  }
}