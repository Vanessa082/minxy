import { VisitModel } from "../models/visit";
import { PipelineStage } from "mongoose";

export class VisitRepo {
  async getFullDecisionSuite(id: string, start?: Date, end?: Date) {
    const match: any = { $or: [{ urlId: id }, { shortId: id }] };

    if (start || end) {
      match.timestamp = {
        ...(start && { $gte: start }),
        ...(end && { $lte: end })
      };
    }

    const pipeline: PipelineStage[] = [
      { $match: match },
      {
        $facet: {
          summary: [
            {
              $group: {
                _id: null,
                totalClicks: { $sum: 1 },
                uniqueClicks: { $addToSet: "$visitorHash" },
                conversions: { $sum: { $cond: ["$isConversion", 1, 0] } },
                firstClick: { $min: "$timestamp" },
                lastClick: { $max: "$timestamp" }
              }
            },
            {
              $project: {
                totalClicks: 1,
                uniqueClicks: { $size: "$uniqueClicks" },
                conversionRate: {
                  $divide: [
                    "$conversions",
                    { $cond: [{ $eq: ["$totalClicks", 0] }, 1, "$totalClicks"] }
                  ]
                },
                firstClick: 1,
                lastClick: 1
              }
            }
          ],
          timeSeries: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                clicks: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ],
          geo: [
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ],
          browsers: [
            { $group: { _id: "$browser", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          os: [
            { $group: { _id: "$os", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          devices: [
            { $group: { _id: "$device", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          // Objective #6: Source Tracking (Flattened)
          referrers: [
            { $group: { _id: "$referrer", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ],
          utmSources: [
            { $group: { _id: "$utm_source", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ]
        }
      }
    ];

    return await VisitModel.aggregate(pipeline);
  }
}

export const visitRepo = new VisitRepo();