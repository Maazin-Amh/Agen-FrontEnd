import { BaseResponseSuccess } from "@/lib/axiosClient";

export interface ChatMessage {
  id?: number;
  sender: {
    id: number;
  };
  receiver: {
    id: number;
  };
  conversation_id: {
    id: number;
  };
  message: string;
  is_read: number;
  file: string;
  room_receiver: string;
  room_sender: string;
  created_at: Date ;
  updated_at: Date;
}

export interface UserChat {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  user1?: {
    id: number;
    nama: string;
    email: string;
  };
  user2?: {
    id: number;
    nama: string;
    email: string;
  };

  messages: ChatMessage[];
  conversation_id?: number | { id: number };
  latestMessage?: ChatMessage;
  totalMessages : number,
  limit : 0,
  pageSize : 10
}

export interface UserChatList extends BaseResponseSuccess {
  data: UserChat[];
}

export interface Typing {
  sender?: string;
  receiver?: string;
  is_typing?: boolean;
}