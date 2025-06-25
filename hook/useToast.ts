// hooks/useToast.ts
"use client";

import { useToast as chakraUseToast } from "@chakra-ui/react";

export const useToast = () => {
  const toast = chakraUseToast();

  const toastSuccess = (message: string) => {
    toast({
      title: message,
      status: "success",
      position: "bottom-right",
      isClosable: true,
      colorScheme: "green",
    });
  };

  const toastWarning = (message: string) => {
    toast({
      title: message,
      status: "warning",
      position: "bottom-right",
      isClosable: true,
      colorScheme: "yellow",
    });
  };

  const toastError = (message = "Maaf, ada kesalahan.") => {
    toast({
      title: message,
      status: "error",
      position: "bottom-right",
      isClosable: true,
      colorScheme: "red",
    });
  };

  return {
    toastSuccess,
    toastWarning,
    toastError,
  };
};
