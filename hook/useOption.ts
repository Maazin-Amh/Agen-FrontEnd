import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosAuth from "./useAuthAxios";
const useOptions = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const getKategori = async (): Promise<any> => {
    return axiosAuthClient.get("/kategori/list").then((res) => res.data);
  };

  const { data: optionKategori, isFetching } = useQuery(
    ["/kategori/list/options"],
    () => getKategori(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("datad", data);

        const options = data?.data?.map((item:any)=> {
            return {
                label : item.nama_kategori,
                value : item.id
            }
        })


        return options
      },
    }
  );

  return { optionKategori };
};

export default useOptions;