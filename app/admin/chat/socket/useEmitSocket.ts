import { useSession } from "next-auth/react";
import useStoreChat from "@/store/useStoreChat";

const useEmitSocket = () => {
  const { data: session } = useSession();
  const socket = useStoreChat((state:any)=> state.socket)

  const typingHandle = (receiver: string, is_typing: boolean): void => {
    socket.emit("typing", {
      sender: session?.user?.email,
      receiver: receiver,
      is_typing: is_typing,
    });
  };


  return {
    typingHandle,

  };
};

export default useEmitSocket;