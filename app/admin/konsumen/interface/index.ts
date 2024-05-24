import { BaseResponseSuccess } from "@/lib/axiosClient";
import { number, string } from "yup";

interface Konsumen {
  id?: number;
  nama_konsumen: string;
  alamat_konsumen: string;
  email: string;
  nomor_handphone: string;

  created_by: {
    id: number;
    nama: string;
  };

  updated_by: {
    id: number;
    nama: string;
  };

}

export interface KonsumenList extends BaseResponseSuccess {
  data: Konsumen[];
}

export interface KonsumenListFilter extends Partial<Konsumen> {
  page: number;
  pageSize: number;
}

export interface KonsumenCreatePayload
  extends Pick<
  Konsumen,
    "nama_konsumen" | "alamat_konsumen" | "email" | "nomor_handphone"
  > {}

export interface KonsumenCreateResponse {
  status: string;
  message: string;
  data?: Konsumen;
}
