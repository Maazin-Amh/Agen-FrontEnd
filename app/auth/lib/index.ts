import { axiosClient, BaseResponseSuccess } from "@/lib/axiosClient";
import {
  LoginPayload,
  LoginResponse,
  LupaPasswordPayload,
  ProfileResponse,
  ProfileUpdatePayload,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
} from "../interface";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hook/useToast";
import { signIn } from "next-auth/react";
import useAxiosAuth from "@/hook/useAuthAxios";
import { useSession } from "next-auth/react";

const useAuthModule = () => {
  const { toastError, toastSuccess, toastWarning } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return axiosClient.post(`/auth/register`, payload).then((res) => res.data);
  };

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LoginPayload) => login(payload),
      {
        onSuccess: async (response) => {
          toastSuccess(response.message);
          await signIn("credentials", {
            id: response.data.id,
            name: response.data.nama,
            email: response.data.email,
            alamat: response.data.alamat,
            password: response.data.password,
            role: response.data.role,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            redirect: false,
          });
          if (response.data.role === "admin") {
            router.push("/dashboard/admin"); // atau halaman admin kamu
          } else {
            router.push("/dashboard/customer"); // atau halaman user biasa
          }
        },
        onError: (error: any) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };

  const useRegister = () => {
    const { mutate, isLoading } = useMutation(
      (payload: RegisterPayload) => register(payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
          router.push("/login");
        },
        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  const lupa_password = async (
    payload: LupaPasswordPayload
  ): Promise<BaseResponseSuccess> => {
    return axiosClient
      .post("/auth/lupa-password", payload)
      .then((res) => res.data);
  };

  const useLupaPassword = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LupaPasswordPayload) => lupa_password(payload),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          router.push("/login");
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );

    return { mutate, isLoading };
  };

  const ResetPassword = async (
    payload: ResetPasswordPayload,
    id: string,
    token: string
  ): Promise<BaseResponseSuccess> => {
    return axiosClient
      .post(`/auth/reset-password/${id}/${token}`, payload)
      .then((res) => res.data);
  };

  const useResetPassword = (id: string, token: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: ResetPasswordPayload) => ResetPassword(payload, id, token),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          router.push("/login");
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );

    return { mutate, isLoading };
  };



  const getProfile = async (): Promise<ProfileResponse> => {
    return axiosAuthClient.get("auth/profile").then((res) => res.data);
  };

  const useProfile = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["auth/profile"],
      () => getProfile(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: session?.user?.id !== undefined,
      }
    );

    return { data, isFetching, isLoading };
  };

  const updateProfile = async (
    payload: ProfileUpdatePayload
  ): Promise<ProfileResponse> => {
    return axiosAuthClient
      .put("profile/update", payload)
      .then((res) => res.data);
  };

  const useUpdateProfile = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProfileUpdatePayload) => updateProfile(payload),
      {
        onSuccess: async (response) => {
          toastSuccess(response.message);
          queryClient.invalidateQueries(["auth/profile"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            return toastWarning(error.response.data.message);
          }

          if (error.response.status == 400) {
            return toastWarning(error.response.data.message.toString());
          }

          toastError();
        },
      }
    );

    return { mutate, isLoading };
  };

  return {
    useRegister,
    useResetPassword,
    useLupaPassword,
    useLogin,
    useUpdateProfile,
    useProfile
  };
};

export default useAuthModule;
