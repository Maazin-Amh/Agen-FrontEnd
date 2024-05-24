import { BaseResponseSuccess } from "@/lib/axiosClient";
import { number, string } from "yup";

interface Kategori {
  id?: number;
  nama_kategori: string ;
  created_by: {
    id: number;
    nama: string;
  };

  updated_by: {
    id: number;
    nama: string;
  };

}

export interface KategoriList extends BaseResponseSuccess {
  data: Kategori[];
}

export interface KategoriListFilter extends Partial<Kategori> {
  page: number;
  pageSize: number;
}

export interface KategoriCreatePayload
  extends Pick<
  Kategori,
    "nama_kategori" 
  > {
}

export interface KategoriDetailResponse extends Kategori {

}
export interface KategoriUpdateResponse {
  status: string;
  message: string;
  data?: Kategori;
}

export interface KategoriUpdatePayload
  extends Pick<
  Kategori,
    "nama_kategori" | "id"
  > {
}
