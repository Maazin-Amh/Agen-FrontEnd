import { axiosClient } from "@/lib/axiosClient";
import { UserListFilter, UserListResponse } from "../interface";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

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
    let [params, setParams] = useState<UserListFilter>(defaultParam);
    let [filter, setFilterParams] = useState<UserListFilter>(defaultParam);

    const handlePageSize = (e: ChangeEvent<any>) => {
      setParams((params) => ({ ...params, pageSize: e.target.value, page: 1 }));
      setFilterParams((params) => ({
        ...params,
        pageSize: e.target.value,
        page: 1,
      }));
    };

    const handeFilter = () => {
      setFilterParams(() => {
        return {
          ...params,
          page: 1,
        };
      });
      setParams((prevParams) => {
        return {
          ...prevParams,
          page: 1,
        };
      });
    };

    const handleClear = () => {
      setFilterParams(defaultParam);
      setParams(defaultParam);
    };

    const handePage = (page: number) => {
      setParams((params) => ({ ...params, page: page }));
      setFilterParams((params) => ({ ...params, page: page }));
    };
    const { data, isFetching, isLoading } = useQuery(
      ["user/list", [filter]],
      () => getUserList(filter),
      {
        select: (response) => response,
      }
    );
    return {
      data,
      isFetching,
      isLoading,
      params,
      handeFilter,
      handePage,
      handlePageSize,
      setParams,
      handleClear
    };
  };

  return { useUserList };
};

export default useUserModule;
