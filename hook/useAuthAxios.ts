import { axiosClient } from "@/lib/axiosClient";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useToast } from "./useToast";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const { toastWarning } = useToast();

  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config: any) => {
        config.headers[
          "Authorization"
        ] = `Bearer ${session?.user?.accessToken}`;

        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosClient.interceptors.response.use(
      async (response: any) => response,
      async (error: any) => {
        // toastWarning(error.response.message);
        // signOut();
        // window.location.replace("/auth/login");
      }
    );

    return () => {
      axiosClient.interceptors.request.eject(requestIntercept);
      axiosClient.interceptors.response.eject(responseIntercept);
    };
  }, [session, toastWarning]);

  return axiosClient;
};

export default useAxiosAuth;
