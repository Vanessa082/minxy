import { UrlModel, type UrlDocument } from "../models/url";
class URLRepo {
  constructor(private readonly urlModel: typeof UrlModel) { }

  async findByOriginalAndUser(original: string, userId: string) {
    return this.urlModel.findOne({ original, userId });
  }

  async create(data: Partial<UrlDocument>) {
    try {
      return this.urlModel.create(data);
    } catch {
      return [];
    }
  }

  async getAllUrlByUserId(userId: string) {
    try {
      return this.urlModel.find({ userId });
    } catch {
      return null
    }
  }

  async getByShortId(shortId: string) {
    try {
      return this.urlModel.findOne({ shortId }).lean();
    } catch {
      return null;
    }
  }

  async deleteById(id: string) {
    try {
      return this.urlModel.deleteOne({ id });
    } catch {
      return null;
    }
  }
}

export const urlRepo = new URLRepo(UrlModel);
