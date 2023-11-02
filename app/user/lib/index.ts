import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axiosClient";
import { UserListFilter, UserListResponse } from "../interface";
import { usePagination } from "@/hook/usePagination";

const useUserModule = () => {
  const defaultParams : UserListFilter = {
    nama: "",
    email: "",
    from_umur: "",
    to_umur: "",
    page: 1,
    pageSize: 10,
  };
  const getUserList = async (
    params: UserListFilter
  ): Promise<UserListResponse> => {
    return axiosClient.get("/user/list", { params }).then((res) => res.data);
  };
  const useUserList = () => {
    const{
      params,
      setParams,
      handeFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams
    } = usePagination(defaultParams)

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

  return { useUserList };
};

export default useUserModule;
