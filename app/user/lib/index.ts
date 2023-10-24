import { axiosClient } from "@/lib/axiosClient";
import { UserListFilter, UserListResponse } from "../interface";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "@/hook/usePagination";

const useUserModule = () => {
  const defaultParam = {
    page: 1,
    pageSize: 10,
    nama: "",
    email: "",
    from_year: "",
    to_year: "",
  };

  const getUserList = async (
    params: UserListFilter
  ): Promise<UserListResponse> => {
    return axiosClient
      .get("/user/list", {
        params: params,
      })
      .then((res) => res.data);
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
    } = usePagination(defaultParam);

    const { data, isFetching, isLoading } = useQuery(
      ["user/list", [filterParams]],
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
      params,
      setParams,
      handeFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
    };
  };

  return { useUserList };
};

export default useUserModule;
