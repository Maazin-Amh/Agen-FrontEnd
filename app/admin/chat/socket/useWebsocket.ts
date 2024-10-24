import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import useCache from "./useCache";
import useStoreChat from "@/store/useStoreChat";

const useWebSocket = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const {handleNewMessage}= useCache();
  const setTyping = useStoreChat((state: any) => state.setTyping);

  // Menggunakan useMemo untuk menginisialisasi socket hanya sekali
  const socket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_API_URL}`, {
        autoConnect: true,
        transports: ["websocket"],
        // query: { token: session?.user?.accessToken },
      }),
    [] // socket hanya diinisialisasi sekali
  );

  useEffect(() => {

    const onConnect = () => {
      console.log("socket is connected");
    };

    const onTypingListen = (data: any) => {
        console.log("typing.listen", data);
        setTyping(data);
      };

    const onDisconnect = () => {
      console.log("socket is disconnected");
    };

     const onJoinReply = (data: any) => {
      console.log("join.reply", data);
    };

    const onReceivedMessage = (data: any) => {
        console.log("received_message", data);
        handleNewMessage(data);
      };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("join.reply", onJoinReply);
    socket.on("received_message", onReceivedMessage);
    socket.on("typing.listen", onTypingListen);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join.reply", onJoinReply);
      socket.off("received_message", onReceivedMessage);
      socket.off("typing.listen", onTypingListen);
    };
  }, [socket]);

  return {
    socket,
  };
};

export default useWebSocket;
