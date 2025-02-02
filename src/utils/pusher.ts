import Pusher from "pusher";
import PusherClient from "pusher-js";
import {env} from "~/env";

export const pusherServer = new Pusher({
  appId: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: env.NEXT_PUBLIC_PUSHER_APP_SECRET,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(
  env.NEXT_PUBLIC_PUSHER_APP_KEY,
  {
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    forceTLS: true,
  },
);
