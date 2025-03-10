import { connectDB } from "@/server/config/database";
// import { userRepo } from "@/server/repository/user.repo";
import { newSuccessApiResponse } from "@/server/req-res";
import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   console.log(req);
//   const { userId } = await auth();

//   await connectDB();

//   return newSuccessApiResponse({
//     message: "User found",
//     data: {
//       id: userId,
//       name: "username",
//       email: "user@gmail.com",
//     },
//   });

//   // const userNotFound = () => {
//   //   return Response.json(
//   //     {
//   //       message: "User not found",
//   //       data: {},
//   //     },
//   //     {
//   //       status: 404,
//   //     },
//   //   );
//   // };

//   // if (!userId) {
//   //   return userNotFound();
//   // }

//   // const user = await userRepo.getByClerkId(userId);

//   // if (!user) {
//   //   return userNotFound();
//   // }

//   // return newSuccessApiResponse({
//   //   message: "User found",
//   //   data: user,
//   // });
// }


export async function GET() {
  return {
    data: {
      name: "John Doe",
      email: "johndoe@gmail.com",
    }
  }
}