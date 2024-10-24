"use client";
import { useEffect, ReactNode } from "react";
import useWebSocket from "./socket/useWebsocket";
import useStoreChat from "@/store/useStoreChat";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { socket } = useWebSocket();
  const setSocket = useStoreChat((state) => state.setSocket);

  useEffect(() => {
    setSocket(socket);
  }, [socket]);

  return <div className="bg-blue-2000">{children}</div>;
}
