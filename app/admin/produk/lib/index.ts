import useAxiosAuth from "@/hook/useAuthAxios";
import { usePagination } from "@/hook/usePagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProdukCreateArrayPayload, ProdukList, ProdukListFilter } from "../interface";
import { useToast } from "@/hook/useToast";
import Swal from "sweetalert2";

const useProdukModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };
  const getProdukList = async (
    params: ProdukListFilter
  ): Promise<ProdukList> => {
    return axiosAuthClient
      .get("/produk/list", { params })
      .then((res) => res.data);
  };
  const useProdukList = () => {
    const {
      filterParams,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/produk/list", [filterParams]],
      () => getProdukList(filterParams),
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


  const useCreateBulProduk = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProdukCreateArrayPayload) => {
        return axiosAuthClient.post("/produk/create-bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Ada Kesalahan",
            showConfirmButton: false,
            timer: 1000,
          });
        },
      }
    );
    return { mutate, isLoading };
  };



  return { useProdukList, useCreateBulProduk };
};

export default useProdukModule;
