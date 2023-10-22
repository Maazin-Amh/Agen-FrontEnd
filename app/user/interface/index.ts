import { BaseResponsePagination } from "@/lib/axiosClient";

interface User {
  id: number;
  nama: string;
  email: string;
  umur: number;
  tanggal_lahir: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UserListResponse extends BaseResponsePagination {
  data: User[];
}

export interface UserListFilter extends Partial<User> {
  from_year?: any;
  to_year?: any;
  page: number;
  pageSize: number;
}
