import { ChangeEvent, useState } from "react";

interface PaginationParams {
  page: number;
  pageSize: number;
}

export const usePagination = <T extends PaginationParams>(defaultParams: T) => {
  let [params, setParams] = useState<T>(defaultParams);
  let [filterParams, setFilterParams] = useState<T>(defaultParams);

  const handleClear = () => {
    setFilterParams(defaultParams);
    setParams(defaultParams);
  };

  const handlePageSize = (e: ChangeEvent<any>) => {
    setParams((params) => ({ ...params, pageSize: e.target.value, page: 1 }));
    setFilterParams((params) => ({
      ...params,
      pageSize: e.target.value,
      page: 1,
    }));
  };

  const handeFilter = (e?: any) => {
  const keyword = e?.target?.value ?? "";

  setParams((prevParams) => {
    const updatedParams = {
      ...prevParams,
      nama_produk: keyword,
      page: 1,
    };

    setFilterParams(updatedParams); // ✅ pakai hasil yang sudah update

    return updatedParams;
  });
};

  const handlePage = (page: number) => {
    setParams((params) => ({ ...params, page: page }));
    setFilterParams((params) => ({ ...params, page: page }));
  };

  return {
    params,
    setParams,
    handeFilter,
    handleClear,
    handlePageSize,
    handlePage,
    filterParams,
  };
};
