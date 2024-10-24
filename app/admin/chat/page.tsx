"use client";
import { useEffect, useState } from "react";
import useConversation from "./lib";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import useMessage from "@/app/admin/chat/socket/useMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatMessage, UserChat, UserChatList } from "./interface";
import { formatDate } from "@/utils/date.utils";
import useStoreChat from "@/store/useStoreChat";
import useEmitSocket from "./socket/useEmitSocket";


export default function Chat() {
  const { data: session } = useSession();
  const {useGetList, useSendMessage}= useConversation()
  const {data, isFetching} = useGetList()
  const [chatList, setChatList] = useState<ChatMessage[]>([]);
  const { message, handleMessage , setMessage} = useMessage();
  const { typingHandle } = useEmitSocket();
  const typing = useStoreChat((state:any)=> state.typing);
   const [selected, setSelected] = useState<UserChat>({
    totalMessages: 0,
    messages: [],
    limit :0,
    pageSize : 10
  });
  const mutateSendMessage = useSendMessage();

  useEffect(() => {
    if (!!selected === true) {
      let filtterd = data?.data?.filter(
        (x: UserChat) => x.conversation_id === selected?.conversation_id
      );
      setChatList(filtterd?.[0]?.messages || []);
    }
  }, [data]);



  if (isFetching) {
    return <div>Mengambil data chat ...</div>;
  }

  if(isFetching){
    return <div>Mengambil data chat ...</div>
  }

  return (
    <>
      <div className="grid grid-cols-7 h-screen w-full bg-[#0C141A]  ">
        <section className="col-span-2 h-scren pt-10 bg-[#111B21]">
          {data &&
            data.data.map((item: any, index: number) => {
              return (
                <section
                  key={index}
                  onClick={() => {
                    setSelected(item);
                    console.log("item", item);
                    setChatList(() => {
                      return item.messages;
                    });
                  }}
                  className={clsx(
                    `flex items-center space-x-2 mb-4 cursor-pointer   p-2`,
                    {
                      "bg-[#2A3942]":
                        selected.conversation_id === item.conversation_id,
                    }
                  )}
                >
                  <div className="bg-red-400 h-10 w-10 rounded-full"></div>
                  <div className="text-white flex flex-col">
                    <span>
                      {item.user1.email !== session?.user.email
                        ? item.user1.nama
                        : item.user2.nama}
                    </span>
                    <span className="text-xs text-[#6E7D87]">
                      {/* {item.latestMessage?.message} */}
                    </span>
                  </div>
                </section>
              );
            })}
        </section>
        <section className="col-span-5 h-screen">
          <div className="h-[60px] w-full bg-[#1F2C33] flex space-x-2 items-center px-3  ">
            <div className="bg-red-400 h-10 w-10 rounded-full"></div>
            <div className="text-white flex flex-col">
              <span>
                {selected?.user1?.email !== session?.user.email
                  ? selected?.user1?.nama
                  : selected?.user2?.nama}
              </span>
              <span className="text-xs text-[#6E7D87]">
              online
              </span>
            </div>
          </div>
          <div
            id="ticketLists"
            className="h-screen-160 text-white flex flex-col-reverse overflow-auto px-5"
          >
            <InfiniteScroll
              style={{ overflowX: "hidden", overflowY: "hidden" }}
              dataLength={chatList.length} //This is important field to render the next data
              next={() => {}}
              className="flex flex-col-reverse pb-10 space-y-5"
            hasMore={selected.totalMessages > selected.messages?.length}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              inverse={true}
              scrollableTarget="ticketLists"
            >
              {[...chatList].map((x: ChatMessage, i: number) => (
                <div
                  className={clsx(
                    "w-full flex mt-5", // Memastikan pesan menggunakan lebar penuh
                    {
                      "justify-end": x.sender.id === session?.user.id, // Pesan di sebelah kanan
                      "justify-start": x.sender.id !== session?.user.id, // Pesan di sebelah kiri
                    }
                  )}
                  key={i}
                >
                  <div
                    className={clsx(
                      "px-1 py-1 rounded max-w-[75%] break-words", // Membatasi lebar pesan max 75% dan membiarkan teks membungkus
                      {
                        "bg-[#015C4B]": x.sender.id === session?.user.id, // Warna untuk pesan user sendiri
                        "bg-[#1D282F]": x.sender.id !== session?.user.id, // Warna untuk pesan orang lain
                      }
                    )}
                  >
                    <span className="text-sm whitespace-pre-wrap">
                      {x.message}
                    </span>
                    <span className="text-[10px] text-right block">
                      {formatDate(x.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
          <div className="h-[100px]  bg-[#1F2C33] w-full p-5 flex items-center space-x-5 ">
            <div className="w-[80%]">
              <textarea
                placeholder="ketik pesan"
                value={message}
                onChange={handleMessage}
                className="bg-gray-200 w-full p-3 rounded-md"
              />
            </div>

            <div className="w-[20%] space-x-5">
              <button
                disabled={message.length === 0}
                className="text-white bg-[#04A784] h-[40px] rounded-lg w-full"
                onClick={() => {
                  mutateSendMessage.mutate(
                    {
                      message: message,
                      room_receiver:
                        selected?.user1?.email !== session?.user.email
                          ? selected?.user1?.email
                          : selected?.user2?.email,

                      conversation_id: {
                        id: selected?.id,
                      },
                      file: "https:/",
                      receiver: {
                        id:
                          selected?.user1?.email !== session?.user.email
                            ? selected?.user1?.id
                            : selected?.user2?.id,
                      },
                    },
                    {
                      onSuccess: () => {
                        setMessage("");
                      },
                    }
                  );
                }}
              >
                Kirim
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}