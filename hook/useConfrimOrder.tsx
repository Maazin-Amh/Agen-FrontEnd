"use client";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

export default function ModalBeli({
  isOpen,
  onClose,
  jumlah,
  onConfirm,
  isLoading,
  disabled,
}: {
  isOpen: boolean;
  onClose: () => void;
  jumlah: number;
  onConfirm: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Konfirmasi Pembelian</ModalHeader>
        <ModalBody>
          Apakah kamu yakin ingin membeli <strong>{jumlah}</strong> produk?
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Batal
          </Button>
          <Button
            colorScheme="blue"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={disabled}
          >
            Ya, Beli
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}