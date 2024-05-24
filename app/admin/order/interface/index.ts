import { BaseResponsePagination } from "@/lib/axiosClient";

export enum Status {
  BAYAR = 'BAYAR',
  BELUM = 'BELUM',
}
export interface OrderDetail {
  id?: number | null | undefined;
  jumlah: number;
  jumlah_harga: number;
  produk: {
    id: number;
    nama: string;
  };
  created_by?: {
    id: number;
    nama: string;
  };
  updated_by?: {
    id: number;
    nama: string;
  };
}

export interface Order {
  id?: number | null | undefined;
  nomor_order?: string;
  tanggal_order: string;
  status: Status;
  total_bayar: number;
  konsumen_id: number | null
  order_detail: OrderDetail[];
  created_by: {
    id: number;
    nama: string;
  };
  updated_by: {
    id: number;
    nama: string;
  };
}

export interface CreateOrder extends Pick<Order, 'tanggal_order' | 'status' | 'total_bayar' | 'konsumen_id' | 'order_detail'> {
}
export interface UpdateOrderPayload extends Pick<Order, "id" | "nomor_order" | "tanggal_order" | "status" | "total_bayar" | "order_detail" | "created_by" | "updated_by"> {
  konsumen_id: number | null | undefined
}
export interface OrderResponse extends BaseResponsePagination {
  data: Order[];
}
export interface OrderListFilter extends Partial<Order> {
  page: number,
  pageSize: number
}
export interface OrderById extends Order { }