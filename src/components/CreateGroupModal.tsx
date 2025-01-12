import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import {CreateGroup} from "~/server/actions/groupActions";
import {useState} from "react";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create New Group</ModalHeader>
            <ModalBody>
              <Input
                label="Group Name"
                placeholder="Enter group name"
                variant="bordered"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Description"
                placeholder="Enter group description"
                variant="bordered"
                onChange={(e) => setDescription(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={() => CreateGroup({name, description})}>
                Create Group
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
} 