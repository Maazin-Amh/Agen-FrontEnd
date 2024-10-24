import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hook/useAuthAxios";

const useConversation = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const getList = () => {
    return axiosAuthClient.get("/chat/list").then((res) => res.data);
  };

  const useGetList = () => {
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/chat/list"],
      () => getList(),
      {
        keepPreviousData: true,
        enabled: !!session === true,
        staleTime: 6000 * 60 * 60 * 24, // 1 hari

        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
    };
  };

  const useSendMessage = () => {
    const mutate = useMutation((payload: any) => {
      return axiosAuthClient.post("/chat/send_message", payload);
    });
    return mutate;
  };

  return { useGetList, useSendMessage };
};

export default useConversation;
