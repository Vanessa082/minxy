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

  async updateUrl(id: string, data: Partial<UrlDocument>) {
    try {
      return this.urlModel.findOneAndUpdate({ id }, {
        ...data,
        updatedAt: new Date(),
      }, { new: true });
    } catch {
      return [];
    }
  }

  async getAllUrlByUserId(userId: string) {
    try {
      return this.urlModel.find({ userId });
    } catch {
      return null;
    }
  }

  async getByShortId(shortId: string): Promise<UrlDocument | null> {
    try {
      return this.urlModel
        .findOneAndUpdate({ shortId }, { $inc: { clicks: 1 } }, { new: true })
        .lean() as unknown as UrlDocument;
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
