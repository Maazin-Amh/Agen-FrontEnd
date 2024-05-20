import useAxiosAuth from "@/hook/useAuthAxios";
import { usePagination } from "@/hook/usePagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProdukCreateArrayPayload, ProdukDetailResponse, ProdukList, ProdukListFilter, ProdukUpdatePayload, ProdukUpdateResponse } from "../interface";
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

  const getDetailProduk = async (id: string): Promise<ProdukDetailResponse> => {
    return axiosAuthClient.get(`/produk/detail/${id}`).then((res) => res.data.data);
  };

  const useDetailProduk = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/produk/detail", { id }],
      () => getDetailProduk(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };


  const updateProduk = (
    payload: ProdukUpdatePayload,
    id: number
  ): Promise<ProdukUpdateResponse> => {
    return axiosAuthClient
      .put(`/produk/update/${id}`, payload)
      .then((res) => res.data);
  };

  const useUpdateProduk = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: ProdukUpdatePayload) => updateProduk(payload, id),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
        },
        onError: (gagal) => {
          console.log("error", gagal);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "ada salah",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      }
    );
    return { mutate, isLoading };
  };

  return { useProdukList, useCreateBulProduk, useDetailProduk, useUpdateProduk };
};

export default useProdukModule;
