import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "./useAuthAxios";
import { useSession } from "next-auth/react";
const useOptions = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const getKategori = async (): Promise<any> => {
    return axiosAuthClient.get("/kategori/list").then((res) => res.data);
  };
  const getKonsumen = async (): Promise<any> => {
    return axiosAuthClient.get("/konsumen/list").then((res) => res.data);
  };
  const getProduk = async (): Promise<any> => {
    return axiosAuthClient.get("/produk/list").then((res) => res.data);
  };

  const { data: optionKategori, isFetching } = useQuery(
    ["/kategori/list/options"],
    () => getKategori(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data kategori", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: item.nama_kategori,
            value: item.id,
          };
        });

        return options;
      },
    }
  );
  const { data: optionKonsumen, isFetching: isFetchingKonsumen } = useQuery(
    ["/konsumen/list/options"],
    () => getKonsumen(),
    {
      enabled: !!session,
      select: (data) => {
        console.log("data konsumen", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: item.nama_konsumen,
            value: item.id,
          };
        });

        return options;
      },
    }
  );
  const { data: optionProduk, isFetching: isFetchingProduk } = useQuery(
    ["/produk/list/options"],
    () => getProduk(),
    {
      enabled: !!session,
      select: (data) => {
        console.log("data Produk", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: item.nama_produk,
            value: item.id,
          };
        });

        return options;
      },
    }
  );

  return { optionKategori, optionKonsumen, optionProduk };
};

export default useOptions;