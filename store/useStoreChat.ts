import { Typing } from "@/app/admin/chat/interface";
import { create } from "zustand";
import { Socket } from "socket.io-client";

interface ChatState {
  socket: Socket | null;
  setSocket: (newSocket: Socket) => void;
  typing: Typing;
  setTyping: (newTyping: Typing) => void;
}

const useStoreChat = create<ChatState>((set) => ({
  socket: null,
  setSocket: (newSocket: Socket) => {
    set((state) => ({
      ...state,
      socket: newSocket,
    }));
  },
  typing: {} as Typing,
  setTyping: (newTyping: Typing) => {
    set((state) => ({
      ...state,
      typing: newTyping,
    }));
  },
}));

export default useStoreChat;