import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosClient } from "@/lib/axiosClient";

import {
  UserCreateArrayPayload,
  UserCreatePayload,
  UserCreateResponse,
  UserDeleteArrayPayload,
  UserDetailResponse,
  UserListFilter,
  UserListResponse,
  UserUpdatePayload,
  UserUpdateResponse,
} from "../interface";
import { usePagination } from "@/hook/usePagination";
import Swal from "sweetalert2";

const useUserModule = () => {
  const queryClient = useQueryClient()
  const defaultParams: UserListFilter = {
    nama: "",
    email: "",
    from_umur: undefined,
    to_umur: undefined,
    page: 1,
    pageSize: 10,
  };
  const getUserList = async (
    params: UserListFilter
  ): Promise<UserListResponse> => {
    return axiosClient.get("/user/list", { params }).then((res) => res.data);
  };

  const createUser = (
    payload: UserCreatePayload
  ): Promise<UserCreateResponse> => {
    return axiosClient.post(`/user/create`, payload).then((res) => res.data);
  };

  const useCreateUser = () => {
    const { isLoading, mutate } = useMutation(
      (payload: UserCreatePayload) => createUser(payload),
      {
        onSuccess: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
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

  const updateUser = (
    payload: UserUpdatePayload,
    id: number
  ): Promise<UserUpdateResponse> => {
    return axiosClient
      .put(`/user/update/${id}`, payload)
      .then((res) => res.data);
  };

  const useUpdateUser = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: UserUpdatePayload) => updateUser(payload, id),
      {
        onSuccess: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
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

  const useUserList = () => {
    const {
      params,
      setParams,
      handeFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/user/list", [filterParams]],
      () => getUserList(filterParams),
      {
        keepPreviousData: true,

        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
      isError,
      params,
      setParams,
      handlePageSize,
      handlePage,
      handeFilter,
      handleClear,
    };
  };

  const getDetailUser = async (id: string): Promise<UserDetailResponse> => {
    return axiosClient.get(`/user/detail/${id}`).then((res) => res.data.data);
  };

  const useDetailUser = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/user/detail", { id }],
      () => getDetailUser(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const useDeleteUser = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/user/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
          queryClient.invalidateQueries(["/user/list"]);
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

  const useCreateBulkUser = () => {
    const { mutate, isLoading } = useMutation(
      (payload: UserCreateArrayPayload) => {
        return axiosClient.post("/user/create/bulk", payload);
      },
      {
        onSuccess: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
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

  const useDeleteBulkUser = () => {
    const { mutate, isLoading } = useMutation(
      (payload: UserDeleteArrayPayload) => {
        return axiosClient.post("/user/delete/bulk", payload);
      },
      {
        onSuccess: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });

          queryClient.invalidateQueries(["/user/list"]);
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

  return {
    useUserList,
    useCreateUser,
    useDetailUser,
    useUpdateUser,
    useDeleteUser,
    useCreateBulkUser,
    useDeleteBulkUser,
  };
};

export default useUserModule;
