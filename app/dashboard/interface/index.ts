import { BaseResponsePagination, BaseResponseSuccess } from "@/lib/axiosClient";
import { number, string } from "yup";

interface Produk {
  id?: number;
  nama_produk: string;
  deskripsi_produk: string;
  barcode?: string;
  files: string;
  harga: number | null;
  stok: number | null;
  terjual?: number;
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

interface Kategori {
  id?: number;
  nama_kategori: string;
  foto: string;
  created_by: {
    id: number;
    nama: string;
  };

  updated_by: {
    id: number;
    nama: string;
  };
}

export interface ProdukPesanan {
  id: number;
  jumlah: number;
  created_at: string;
  status: string;
  total: number;
  produk: {
    nama_produk: string;
  };
  customer_by: {
    id: number;
    nama: string;
    alamat: string;
  };
}

export interface PesananDetailResponse extends ProdukPesanan {}

export interface PesananList extends BaseResponsePagination {
  data: ProdukPesanan[];
}

export interface PesananListFilter extends Partial<ProdukPesanan> {
  page: number;
  pageSize: number;
}

export interface ProdukList extends BaseResponsePagination {
  data: Produk[];
}

export interface ProdukListFilter extends Partial<Produk> {
  page: number;
  pageSize: number;
}

export interface ProdukCreatePayload
  extends Pick<Produk, "harga" | "nama_produk" | "deskripsi_produk" | "stok"> {
  kategori_id: number | null;
}

export interface ProdukCreateArrayPayload {
  data: ProdukCreatePayload[];
}

export interface ProdukDetailResponse extends Produk {}
export interface ProdukUpdateResponse {
  status: string;
  message: string;
  data?: Produk;
}
export interface ProdukUpdatePayload
  extends Pick<Produk, "harga" | "stok" | "files" | "id"> {
  file?: File;
}

export interface KategoriList extends BaseResponsePagination {
  data: Kategori[];
}

export interface KategoriDetailList extends BaseResponsePagination {
  data: Produk[];
}

export interface KategoriListFilter extends Partial<Kategori> {
  page: number;
  pageSize: number;
}

export interface ProdukListFilter extends Partial<Produk> {
  page: number;
  pageSize: number;
}
