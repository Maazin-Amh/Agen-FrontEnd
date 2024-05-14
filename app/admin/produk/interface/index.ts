import { BaseResponseSuccess } from "@/lib/axiosClient";
import { number, string } from "yup";

interface Produk {
  id?: number;
  nama_produk: string;
  deskripsi_produk: string;
  barcode: string;
  harga: number | null ;
  stok: number | null;

  created_by: {
    id: number;
    nama: string;
  };

  updated_by: {
    id: number;
    nama: string;
  };
  
  kategori: {
    id: number;
    nama_kategori: string;
  };
}

export interface ProdukList extends BaseResponseSuccess {
  data: Produk[];
}

export interface ProdukListFilter extends Partial<Produk> {
  page: number;
  pageSize: number;
}

export interface ProdukCreatePayload
  extends Pick<
    Produk,
    "harga" | "barcode" | "nama_produk" | "deskripsi_produk" | "stok"
  > {
  kategori_id: number | null;
}


export interface ProdukCreateArrayPayload {
  data: ProdukCreatePayload[];
}