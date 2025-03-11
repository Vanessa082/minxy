import { Fetcher } from "@/lib/fetch";
import { type UserDocument } from "@/server/models/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { FC } from "react";

export type WithCurrentUserComponentProps<T = object> = T & {
  user: UserDocument | null;
};

type ExcludeUser<T> = Omit<T, "user">;

export function CurrentUserProvider<T = object>(
  Component: FC<WithCurrentUserComponentProps<T>>,
) {
  return async function Guard(props: ExcludeUser<T>) {
    const { userId } = await auth();
    const res = await Fetcher<UserDocument | null>("/auth/current-user", {
      queries: {
        clerkId: userId || "", // for some reason invoking `auth()` from clerk in the server route doest give the clerk userId, but it does here
      },
    });

    if (userId && !res.data) {
      // meaning user is signed up on clerk but not in our database
      redirect("/app/onboarding");
    }

    let user: UserDocument | null = null;

    if (res.data) {
      user = {
        id: res.data?.id,
        clerkId: res.data?.clerkId,
        name: res.data?.name,
        email: res.data?.email,
        createdAt: res.data?.createdAt,
        updatedAt: res.data?.updatedAt,
      };
    }

    if (typeof res === "string") {
      // could come as 404 page which will be a string
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: res,
          }}
        />
      );
    }

    return <Component {...(props as T)} user={user} />;
  };
}
