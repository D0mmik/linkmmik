import {Card} from "@nextui-org/card";
import {UsersIcon} from "lucide-react";
import {useSession} from "next-auth/react";

interface GroupCardProps {
  name?: string | undefined;
  memberCount?: number | null;
  description?: string | null;
  creatorId?: string | null;
  joinCode?: string | null;
}

export default function GroupCard ({ name, memberCount, description, creatorId, joinCode }: GroupCardProps) {
  
  const session = useSession()
  const creator = creatorId === session.data?.user?.id
  
  return (
    <Card className="w-full cursor-pointer p-4 transition-transform hover:scale-[1.02]">
      <div className="mb-2 flex items-center gap-2">
        <UsersIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <p className="mb-2 text-sm text-default-500">{description}</p>
      <p className="text-xs text-default-400">{memberCount} members</p>
      {creator && <p className="text-xs text-default-400">you created this group</p>}
      {creator && <p className="text-xs text-default-400">Invite code: {joinCode}</p>}
    </Card>
  );
};