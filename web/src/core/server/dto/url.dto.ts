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
  createdAt: Date;
  updatedAt: Date;
}

export type URLUpdateDTO = Partial<Omit<URLDTO,
  | "id"
  | "userId"
  | "name"
  | "original"
  | "shortId"
  | "clicks"
  | "status"
  | "password"
  | "deletedAt"
  | "createdAt"
  | "updatedAt"
>
>
