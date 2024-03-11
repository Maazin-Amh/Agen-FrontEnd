import { BaseResponseSuccess } from "@/lib/axiosClient";

interface Produk {
  nama_produk: string;
  deskripsi_produk: string;
  harga: number;
  stok: number;
}

export interface ProdukList extends BaseResponseSuccess {
  data: Produk[];
}

export interface ProdukListFilter extends Partial<Produk> {
  page: number;
  pageSize: number;
}
