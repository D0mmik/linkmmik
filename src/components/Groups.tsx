"use client"
import { Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon, UserPlusIcon } from "lucide-react";
import GroupCard from "~/components/GroupCard";
import CreateGroupModal from "~/components/CreateGroupModal";
import JoinGroupModal from "~/components/JoinGroupModal";
import {type Group} from "~/types";

export default function Groups({ groups }: {groups: Group[]}) {

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const {
    isOpen: isJoinOpen,
    onOpen: onJoinOpen,
    onClose: onJoinClose,
  } = useDisclosure();

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl px-4">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold">Your Groups</h1>
          <div className="flex gap-2">
            <Button
              color="primary"
              endContent={<PlusIcon size="18" />}
              onPress={onCreateOpen}
            >
              Create Group
            </Button>
            <Button
              variant="bordered"
              endContent={<UserPlusIcon size="18" />}
              onPress={onJoinOpen}
            >
              Join Group
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <GroupCard key={index} {...group} name={group.name ?? undefined} />
          ))}
        </div>

        <CreateGroupModal isOpen={isCreateOpen} onClose={onCreateClose} />
        <JoinGroupModal isOpen={isJoinOpen} onClose={onJoinClose} />
      </div>
    </div>
  );
}