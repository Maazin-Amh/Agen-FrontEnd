import { useState } from "react";

export const useDisclosure = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { onOpen, onClose, isOpen };
};
