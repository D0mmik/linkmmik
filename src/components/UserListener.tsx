"use client"

import {useEffect} from "react";
import {pusherClient} from "~/utils/pusher";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export function UserListener() {

  const router = useRouter()
  const session = useSession()

  const userId = session.data?.user?.id;

  useEffect(() => {
    if (!session.data?.user?.id) return;

    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind("new-link-user", (data: { senderId: string }) => {
      if (data.senderId !== session.data?.user?.id) {
        router.refresh();
      }
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  return null
}