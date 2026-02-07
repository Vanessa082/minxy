export interface ShortenResponse {
  id: string;
  original: string;
  shortId: string;
  userId: string;
  clicks: number;
  status: string;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsDimension {
  _id: string;
  count: number;
}

export interface AnalyticsData {
  summary: {
    totalClicks: number;
    uniqueClicks: number;
    conversionRate: number;
  };
  timeSeries: Array<{
    _id: string;
    clicks: number;
  }>;
  geo: AnalyticsDimension[];
  tech: Array<{
    browsers: AnalyticsDimension[];
    os: AnalyticsDimension[];
    devices: AnalyticsDimension[];
  }>;
  sources: Array<{
    utm_sources: AnalyticsDimension[];
  }>;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
}

export interface DataTableProps {
  title: string;
  icon?: React.ReactNode;
  rows: AnalyticsDimension[];
}


export interface Visit {
  urlId: string;
  shortId: string;
  visitorHash: string;
  timestamp: Date;
  country: string;
  city: string;
  region: string;
  device: "desktop" | "mobile" | "tablet";
  browser: string;
  os: string;
  screen: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  isConversion: boolean;
  isBot: boolean;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}
