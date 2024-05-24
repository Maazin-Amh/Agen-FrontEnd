import useAxiosAuth from "@/hook/useAuthAxios";
import { usePagination } from "@/hook/usePagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KonsumenCreatePayload, KonsumenCreateResponse, KonsumenList, KonsumenListFilter } from "../interface";
import { useToast } from "@/hook/useToast";
import Swal from "sweetalert2";

const useKonsumenModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const queryClient = useQueryClient();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };
  const getKonsumenList = async (
    params: KonsumenListFilter
  ): Promise<KonsumenList> => {
    return axiosAuthClient
      .get("/konsumen/list", { params })
      .then((res) => res.data);
  };
  const useKonsumenList = () => {
    const {
      filterParams,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/konsumen/list", [filterParams]],
      () => getKonsumenList(filterParams),
      {
        keepPreviousData: true,

        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
    };
  };

  const createKonsumen = (
    payload: KonsumenCreatePayload
  ): Promise<KonsumenCreateResponse> => {
    return axiosAuthClient.post(`/konsumen/create`, payload).then((res) => res.data);
  };

  const useCreateKonsumen = () => {
    const { isLoading, mutate } = useMutation(
      (payload: KonsumenCreatePayload) => createKonsumen(payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
        },
        onError: (gagal) => {
          console.log("error", gagal);
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };




  return { useKonsumenList, useCreateKonsumen };
};

export default useKonsumenModule;
