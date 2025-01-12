import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import {useState} from "react";
import {JoinGroup} from "~/server/actions/groupActions";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinGroupModal({ isOpen, onClose }: JoinGroupModalProps) {

  const [code, setCode] = useState("")

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Join Group</ModalHeader>
            <ModalBody>
              <Input
                label="Group Code"
                placeholder="Enter group invite code"
                variant="bordered"
                onChange={(e) => setCode(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={() => JoinGroup(code)}>
                Join Group
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
} 