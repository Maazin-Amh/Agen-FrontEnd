import { BaseResponsePagination } from "@/lib/axiosClient";

interface User {
  id: number;
  nama: string;
  email: string;
  umur: string | number | undefined;
  tanggal_lahir: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UserListResponse extends BaseResponsePagination {
  data: User[];
}

export interface UserListFilter extends Partial<User> {
  from_umur?: string;
  to_umur?: string;
  page: number;
  pageSize: number;
}

export interface UserCreatePayload
  extends Pick<User, "nama" | "email" | "umur" | "tanggal_lahir" | "status"> {}
