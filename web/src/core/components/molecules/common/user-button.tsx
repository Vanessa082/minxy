"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fetcher } from "@/lib/fetch";
import { getProfileURLFromInitials } from "@/lib/utils";
import type { UserDocument } from "@/server/models/user";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";

export function UserButton() {
  const [userState, setUserState] = useState<{
    loading: boolean;
    value: UserDocument | null;
  }>({
    loading: true,
    value: null,
  });

  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      setUserState({ loading: false, value: null });
      return;
    }

    (async () => {
      setUserState((prev) => ({ ...prev, loading: true }));

      if (user?.id) {
        try {
          const res = await Fetcher<UserDocument | null>("/auth/current-user", {
            queries: {
              clerkId: user.id,
            },
          });

          setUserState((prev) => ({ ...prev, value: res.data }));
        } catch {
          setUserState((prev) => ({ ...prev, value: null }));
        }
      }

      setUserState((prev) => ({ ...prev, loading: false }));
    })();
  }, [isSignedIn, user?.id]);

  const avatar = useMemo(() => {
    if (userState.value?.name) {
      return {
        src: getProfileURLFromInitials(userState.value?.name),
        alt: userState.value?.name,
      };
    }

    return {
      src: "/profile.png",
      alt: "username",
    };
  }, [userState.value]);

  if (userState.loading) {
    return <div className="size-8 rounded-full bg-slate-400" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatar.src} alt={avatar.alt} />
          <AvatarFallback>{avatar.alt[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-app-white-500">
        <DropdownMenuItem className="flex">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
