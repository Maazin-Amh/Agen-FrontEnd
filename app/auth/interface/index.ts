import { BaseResponseSuccess } from "@/lib/axiosClient";

interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
  refresh_token: string;
  access_token: string;
  avatar: string;
  role: string;
}

export interface LoginPayload extends Pick<User, "email" | "password"> {}
export interface RegisterResponse extends BaseResponseSuccess {}

export interface RegisterPayload
  extends Pick<User, "nama" | "email" | "password"> {}
export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}
export interface ResetPasswordPayload {
  new_password: string;
}
export interface LupaPasswordPayload extends Pick<User, "email"> {}
export interface ProfileResponse extends BaseResponseSuccess {
  data: User;
}
