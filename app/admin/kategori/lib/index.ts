import useAxiosAuth from "@/hook/useAuthAxios";
import { usePagination } from "@/hook/usePagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hook/useToast";
import Swal from "sweetalert2";
import { KategoriCreatePayload, KategoriDetailResponse, KategoriList, KategoriListFilter, KategoriUpdatePayload, KategoriUpdateResponse } from "../interface";

const useKategoriModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const queryClient = useQueryClient();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };
  const getkategorilist = async (
    params: KategoriListFilter
  ): Promise<KategoriList> => {
    return axiosAuthClient
      .get("/kategori/list", { params })
      .then((res) => res.data);
  };
  const useKategoriList = () => {
    const {
      filterParams,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/kategori/list", [filterParams]],
      () => getkategorilist(filterParams),
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




  const getDetailKategori = async (id: string): Promise<KategoriDetailResponse> => {
    return axiosAuthClient.get(`/kategori/detail/${id}`).then((res) => res.data.data);
  };

  const useDetailKategori = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/kategori/detail", { id }],
      () => getDetailKategori(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };


  const updateKategori = (
    payload: KategoriUpdatePayload,
    id: number
  ): Promise<KategoriUpdateResponse> => {
    return axiosAuthClient
      .put(`/kategori/update/${id}`, payload)
      .then((res) => res.data);
  };

  const useUpdateKategori = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: KategoriUpdatePayload) => updateKategori(payload, id),
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

  const createKategori = (
    payload: KategoriCreatePayload
  ): Promise<KategoriUpdateResponse> => {
    return axiosAuthClient.post(`/kategori/create`, payload).then((res) => res.data);
  };

  const useCreateKategori = () => {
    const { isLoading, mutate } = useMutation(
      (payload: KategoriCreatePayload) => createKategori(payload),
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


  const useDeleteKategori = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.delete(`/kategori/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/kategori/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            Swal.fire({
              position: "top",
              icon: "warning",
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Ada Kesalahan",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        },
      }
    );

    return { mutate, isLoading };
  };


  return { useKategoriList, useDetailKategori, useUpdateKategori, useCreateKategori,useDeleteKategori };
};

export default useKategoriModule;
