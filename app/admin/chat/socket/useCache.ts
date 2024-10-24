import { useQueryClient } from "@tanstack/react-query";
import { ChatMessage, UserChat, UserChatList } from "../interface";

const useCache = () => {
  const queryClient = useQueryClient();
  const handleNewMessage = async (data: ChatMessage) => {
    await queryClient.cancelQueries(["/chat/list"]);



    // Ambil data sebelumnya dari cache
    const previousConversations = queryClient.getQueryData<UserChatList>([
      "/chat/list",
    ]);

    if (previousConversations) {
      // Temukan apakah conversation_id sudah ada
      const existingConversationIndex = previousConversations.data.findIndex(
        (convo: UserChat) => convo.conversation_id === data.conversation_id.id
      );

      if (existingConversationIndex !== -1) {
        // Update existing conversation
        const updatedConversations = previousConversations.data.map((convo) => {
          if (convo.conversation_id === data.conversation_id.id) {
            // Tambahkan pesan baru ke array messages
            const latest = convo.messages || [];
            const updatedMessages = [data, ...latest];
            return {
              ...convo,
              messages: updatedMessages,
              latestMessage: data, // Update latestMessage untuk percakapan ini
            };
          }
          return convo;
        });

        console.log("updatedConversations", updatedConversations);
        const sortedConversations = updatedConversations.sort((a, b) => {
          const latestMessageA = a.latestMessage?.created_at
            ? new Date(a.latestMessage.created_at)
            : new Date(0);
          const latestMessageB = b.latestMessage?.created_at
            ? new Date(b.latestMessage.created_at)
            : new Date(0);
          return latestMessageB.getTime() - latestMessageA.getTime(); // Urutkan dari yang terbaru
        });

        // Perbarui cache dengan data yang telah diperbarui
        queryClient.setQueryData(["/chat/list"], {
          ...previousConversations,
          data: sortedConversations,
        });
      } else {
        // Jika conversation_id baru, tambahkan ke data
        const updatedData = [
          {
            id: data.conversation_id.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user1: {}, // Sesuaikan dengan data yang ada
            user2: {}, // Sesuaikan dengan data yang ada
            messages: [data],
            latestMessage: data,
            conversation_id: data.conversation_id.id,
          },
          ...previousConversations.data,
        ];

        const sortedConversations = updatedData.sort((a, b) => {
          const latestMessageA = a.latestMessage?.created_at
            ? new Date(a.latestMessage.created_at)
            : new Date(0);
          const latestMessageB = b.latestMessage?.created_at
            ? new Date(b.latestMessage.created_at)
            : new Date(0);
          return latestMessageB.getTime() - latestMessageA.getTime(); // Urutkan dari yang terbaru
        });

        // Perbarui cache dengan data yang telah diperbarui
        queryClient.setQueryData(["/chat/list"], {
          ...previousConversations,
          data: sortedConversations,
        });
      }
    } else {
      // Jika tidak ada data sebelumnya, set data baru ke cache
      queryClient.setQueryData(["/chat/list"], {
        status: "Success",
        message: "OK",
        data: [
          {
            id: data.conversation_id.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user1: {}, // Sesuaikan dengan data yang ada
            user2: {}, // Sesuaikan dengan data yang ada
            messages: [data],
            latestMessage: data,
            conversation_id: data.conversation_id.id,
          },
        ],
      });
    }
  };

  return {handleNewMessage}
};


export default useCache