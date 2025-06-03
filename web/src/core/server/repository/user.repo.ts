import { UserModel, type UserDocument } from "../models/user";

class UserRepo {
  constructor(private readonly userModel: typeof UserModel) { }

  async create(data: UserDocument) {
    try {
      return this.userModel.create(data);
    } catch {
      return null;
    }
  }

  async deleteById(id: string) {
    try {
      return this.userModel.deleteOne({ id });
    } catch {
      return null;
    }
  }

  async getByUserId(id: string) {
    try {
      return this.userModel.findOne({ id }).lean();
    } catch {
      return null
    }
  }

  async getByClerkId(clerkId: string) {
    try {
      return this.userModel.findOne({ clerkId }).lean();
    } catch {
      return null;
    }
  }
}

export const userRepo = new UserRepo(UserModel);

// (async () => {
//   await connectDB();

//   const res = await userRepo.deleteById('user_4ZTrKBc0xWZKpzvLbOqNL');

//   console.log('\nuser deleted\n', res);
// })();
