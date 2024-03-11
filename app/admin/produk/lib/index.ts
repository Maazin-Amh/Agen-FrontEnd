import useAxiosAuth from "@/hook/useAuthAxios";
import { usePagination } from "@/hook/usePagination";
import { useQuery } from "@tanstack/react-query";
import { ProdukList, ProdukListFilter } from "../interface";

const useProdukModule = () => {
  const axiosAuthClient = useAxiosAuth();
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

  return { useProdukList };
};

export default useProdukModule;
