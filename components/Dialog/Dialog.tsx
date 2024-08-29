import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

export type DialogBaseProps = {
  isOpen: boolean;
  onClose: () => void;
};

type DialogProps = DialogBaseProps & {
  header: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  content,
  children,
}) => {
  return (
    <Modal
      className="rounded mt-2 mx-2"
      isOpen={isOpen}
      scrollBehavior="outside"
      shouldBlockScroll={true}
      size="2xl"
      onClose={onClose}
    >
      <ModalContent>
        <>
          <ModalHeader className="inline">{header}</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            {children || content}
          </ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </>
      </ModalContent>
    </Modal>
  );
};
