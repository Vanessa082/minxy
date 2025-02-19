// import { Fetcher } from "@/lib/fetch";
import { type UserDocument } from "@/server/models/user";
import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import type { FC } from "react";

export type WithCurrentUserComponentProps<T = object> = T & {
  user: UserDocument | null;
};

type ExcludeUser<T> = Omit<T, "user">;

export function CurrentUserProvider<T = object>(
  Component: FC<WithCurrentUserComponentProps<T>>,
) {
  return async function Guard(props: ExcludeUser<T>) {
    // const res = await Fetcher<UserDocument | null>("/auth/current-user", {
    //   method: "GET",
    // });

    const { userId } = await auth();

    // if (userId && !res.data) {
    //   redirect('/app/onboarding');
    // }

    const res = {
      data: {
        id: userId,
        name: "username",
        email: "user@gmail.com",
      } as UserDocument,
    };

    return <Component {...(props as T)} user={res.data} />;
  };
}
