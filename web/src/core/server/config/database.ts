<<<<<<< HEAD
import mongoose from "mongoose"

 const connectDB = async () =>{
  if(mongoose.connections[0].readyState) return true;
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Database connected successfully')
    return true
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
=======
import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return true;
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
>>>>>>> 4d451c0 (build onboarding form changing the redirect route to app/onboarding)
