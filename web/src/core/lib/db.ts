import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGO_URI as string);
}
export default connectMongo