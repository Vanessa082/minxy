type UrlStatus = "active" | "inactive";

export interface URLDTO {
  id: string;
  userId: string;
  name: string;
  original: string;
  shortId: string;
  clicks: number;
  status: UrlStatus;
  password: string;
  deletedAt: Date;
}
