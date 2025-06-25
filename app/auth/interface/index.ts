import { BaseResponseSuccess } from "@/lib/axiosClient";

interface Customer {
  id?: number;
  nama: string;
  email: string;
  password: string | undefined;
  alamat: string;
  role: string;
  refresh_token: string;
  access_token: string;
  created_at:string;
}

export interface LoginPayload extends Pick<Customer, "email" | "password"> {}

export interface RegisterPayload
  extends Pick<Customer, "nama" | "alamat" | "password" | "email"> {}

export interface LoginResponse extends BaseResponseSuccess {
  data: Customer;
}

export interface ResetPasswordPayload {
  new_password: string;
}
export interface LupaPasswordPayload extends Pick<Customer, "email"> {}

export interface RegisterResponse extends BaseResponseSuccess {}

export interface ProfileResponse extends BaseResponseSuccess {
  data: Customer;
}

export interface ProfileUpdatePayload
  extends Pick<Customer, "alamat" | "id" > {
}
