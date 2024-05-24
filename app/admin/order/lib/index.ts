import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { CreateOrder, OrderDetail, OrderListFilter, OrderResponse, UpdateOrderPayload } from "../interface";
import useAxiosAuth from "@/hook/useAuthAxios";
import { useToast } from "@/hook/useToast";
import { usePagination } from "@/hook/usePagination";

const useOrderModule = () => {
  const router = useRouter();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const defaultParams: OrderListFilter = {
    page: 1,
    pageSize: 10
  }
  const { toastError, toastSuccess, toastWarning } = useToast();

  const getOrder = async (params: OrderListFilter): Promise<OrderResponse> => {
    return axiosAuthClient.get("/order/list", { params }).then((res) => res.data)
  }

  const useOrder = () => {
    const {
      params,
      setParams,
      handeFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams
    } = usePagination(defaultParams)
    const { data, isLoading, isFetching } = useQuery(
      ["/order/list", [filterParams]],
      () => getOrder(filterParams),
      {
        keepPreviousData: true,
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined
      }
    );
    return {
      data,
      isLoading,
      isFetching,
      params,
      setParams,
      handlePageSize,
      handlePage,
      handeFilter,
      handleClear,
    }
  };
  const useCreateOrder = () => {
    const { mutate, isLoading } = useMutation(
      (payload: CreateOrder) => {
        return axiosAuthClient.post('/order/tambah', payload)
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          router.push('/admin/order')
          queryClient.invalidateQueries(["/order/list"])
        },
        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading }
  }

  const getDetailOrder = async (id: string): Promise<OrderDetail> => {
    return axiosAuthClient.get(`/order/detail/${id}`).then((res) => res.data);
  }

  const useDetailOrder = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/order/detail", { id }],
      () => getDetailOrder(id),
      {
        select: (response) => response
      }
    );
    return { data, isFetching, isLoading }
  }
  const useUpdateorder = (id: number) => {
    const { mutate, isLoading } = useMutation(
      (payload: UpdateOrderPayload) => {
        return axiosAuthClient.put(`/order/update/${id}`, payload).then((res) => res.data);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/order/list"]);
        },
        onError: (e) => {
          console.log(e, 'error');
          toastError();
        }
      },
    );
    return { mutate, isLoading };
  }
  const useDeleteOrder = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/order/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message)
          queryClient.invalidateQueries(["/order/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message)
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading }
  }

  return { useOrder, useCreateOrder, useDetailOrder, useUpdateorder, useDeleteOrder }

}
export default useOrderModule