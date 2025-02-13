import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose?.connections && mongoose?.connections[0]?.readyState) {
    console.log("\nDatabase already connected\n");
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("\nDatabase connected successfully\n");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
