"use client"

import {type Group} from "~/types";
import {useEffect} from "react";
import {pusherClient} from "~/utils/pusher";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export function GroupListener({groups}: { groups: Group[] }) {

  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (!groups.length) return;

    groups.forEach((group) => {
      const channel = pusherClient.subscribe(`group-${group.id}`);

      channel.bind("new-link", (data: { senderId: string }) => {
        if (data.senderId !== session.data?.user?.id) {
          router.refresh();
        }
      });
    });

    return () => {
      groups.forEach((group) => {
        pusherClient.unsubscribe(`group-${group.id}`);
      });
    };
  }, [groups]);

  return null
}