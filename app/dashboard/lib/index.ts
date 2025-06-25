import useAxiosAuth from "@/hook/useAuthAxios";
import { usePagination } from "@/hook/usePagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  KategoriDetailList,
  KategoriList,
  KategoriListFilter,
  PesananDetailResponse,
  PesananList,
  PesananListFilter,
  ProdukCreateArrayPayload,
  ProdukDetailResponse,
  ProdukList,
  ProdukListFilter,
  ProdukPesanan,
  ProdukUpdatePayload,
  ProdukUpdateResponse,
} from "../interface";
import { useToast } from "@/hook/useToast";
import { useRouter } from "next/navigation";
import { BaseResponseSuccess } from "@/lib/axiosClient";
import useUploadFile from "@/hook/useUploadFile";

const useProdukModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const queryClient = useQueryClient();
  const { uploadSingle } = useUploadFile();
  const router = useRouter();
  const { toastError, toastSuccess, toastWarning } = useToast();

  const defaultParams = { page: 1, pageSize: 10, nama_produk: "" };

  const getProdukList = async (params: ProdukListFilter): Promise<ProdukList> =>
    axiosAuthClient.get("/produk/list", { params }).then((res) => res.data);

  const useProdukList = () => {
    const {
      params,
      setParams,
      handeFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/produk/list", [filterParams]],
      () => getProdukList(filterParams),
      { keepPreviousData: true, select: (response) => response }
    );

    return {
      data,
      isFetching,
      isLoading,
      isError,
      params,
      setParams,
      handlePageSize,
      handlePage,
      handeFilter,
      handleClear,
    };
  };

  const useCreateBulProduk = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProdukCreateArrayPayload) =>
        axiosAuthClient.post("/produk/create-bulk", payload),
      {
        onSuccess: (res) => {
          toastSuccess(res.data.message);
          queryClient.invalidateQueries(["/produk/list"]);
        },
        onError: () => toastError("Gagal membuat produk"),
      }
    );
    return { mutate, isLoading };
  };

  const getDetailProduk = async (id: string): Promise<ProdukDetailResponse> =>
    axiosAuthClient.get(`/produk/detail/${id}`).then((res) => res.data.data);

  const useDetailProduk = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/produk/detail", { id }],
      () => getDetailProduk(id),
      { select: (response) => response }
    );
    return { data, isFetching, isLoading };
  };

  const updateProduk = async (payload: ProdukUpdatePayload, id: number) => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      payload = { ...payload, files: res.data.file_url };
    }
    return axiosAuthClient.put(`/produk/update/${id}`, payload).then((res) => res.data);
  };

  const useUpdateProduk = (id: number) => {
    const { mutate, isLoading } = useMutation(
      (payload: ProdukUpdatePayload) => updateProduk(payload, id),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          queryClient.invalidateQueries(["/produk/list"]);
        },
        onError: () => toastError("Gagal update produk"),
      }
    );
    return { mutate, isLoading };
  };

  const useDeleteProduk = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => axiosAuthClient.delete(`/produk/delete/${id}`),
      {
        onSuccess: (res) => {
          toastSuccess(res.data.message);
          queryClient.invalidateQueries(["/produk/list"]);
        },
        onError: (err) => {
         toastError("Gagal hapus produk");
        },
      }
    );
    return { mutate, isLoading };
  };

  const usePesanProduk = () => {
    const { mutate, isLoading } = useMutation(
      (data: { produkId: number; jumlah: number }) =>
        axiosAuthClient.post(`/order/${data.produkId}/pesan`, { jumlah: data.jumlah }),
      {
        onSuccess: () => {
          toastSuccess("Berhasil memesan produk");
          queryClient.invalidateQueries(["/order/all"]);
          queryClient.invalidateQueries(["keranjang"]);
          queryClient.invalidateQueries(["pemasukan-ringkasan"]);
          queryClient.invalidateQueries(["riwayat-pesanan"]);
          router.refresh();
        },
        onError: () => toastError(),
      }
    );
    return { mutate, isLoading };
  };

  const updatePesananStatus = async (kode_transaksi: string, status: string) =>
    axiosAuthClient.patch(`/order/${kode_transaksi}/status`, { status }).then((res) => res.data);

  const useUpdatePesananStatus = () => {
    return useMutation(
      ({ kode_transaksi, status }: { kode_transaksi: string; status: string }) =>
        updatePesananStatus(kode_transaksi, status),
      {
        onSuccess: () => {
          toastSuccess("Status berhasil diperbarui!");
          queryClient.invalidateQueries(["/order/all"]);
          queryClient.invalidateQueries(["pemasukan-ringkasan"]);
        },
        onError: () => toastError(),
      }
    );
  };

  const getDetailPesanan = async (id: string): Promise<PesananDetailResponse> =>
    axiosAuthClient.get(`/order/detail/${id}`).then((res) => res.data.data);

  const useDetailPesanan = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/produk/detail", { id }],
      () => getDetailPesanan(id),
      { select: (response) => response }
    );
    return { data, isFetching, isLoading };
  };

  const usePemasukan = () =>
    useQuery({
      queryKey: ["pemasukan-bulan-ini"],
      queryFn: async () =>
        axiosAuthClient.get("/order/rekap-pemasukan").then((res) => res.data.data),
    });

  const getPesananList = async (params: PesananListFilter): Promise<PesananList> =>
    axiosAuthClient.get("/order/all", { params }).then((res) => res.data);

  const usePesananList = () => {
    const { filterParams } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/order/all", [filterParams]],
      () => getPesananList(filterParams),
      {
        keepPreviousData: true,
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        select: (response) => response,
      }
    );
    return { data, isFetching, isLoading };
  };

  const getkategorilist = async (params: KategoriListFilter): Promise<KategoriList> =>
    axiosAuthClient.get("/kategori/list", { params }).then((res) => res.data);

  const useKategoriList = () => {
    const { filterParams } = usePagination(defaultParams);
    const { data, isFetching, isLoading } = useQuery(
      ["/kategori/list", [filterParams]],
      () => getkategorilist(filterParams),
      { keepPreviousData: true, select: (response) => response }
    );
    return { data, isFetching, isLoading };
  };

  const getDetailKategori = async (id: string): Promise<KategoriDetailList> =>
    axiosAuthClient.get(`/produk/by-kategori/${id}`).then((res) => res.data);

  const useDetaillKategori = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/produk/detail", [id]],
      () => getDetailKategori(id),
      { select: (response) => response }
    );
    return { data, isFetching, isLoading };
  };

  const useRiwayatPesanan = () =>
    useQuery({
      queryKey: ["riwayat-pesanan"],
      queryFn: async (): Promise<BaseResponseSuccess> =>
        axiosAuthClient.get("/order/riwayat").then((res) => res.data),
      select: (res) => res.data,
    });

  const useRingkasanPemasukan = () =>
    useQuery({
      queryKey: ["pemasukan-ringkasan"],
      queryFn: async () =>
        axiosAuthClient.get("/order/pemasukan/ringkasan").then((res) => res.data.data),
    });

  const useKeranjang = () =>
    useQuery(["keranjang"], async () =>
      axiosAuthClient.get("/order/keranjang/list").then((res) => res.data.data)
    );

  const useTambahKeKeranjang = () =>
    useMutation(
      async ({ produk_id, jumlah }: { produk_id: number; jumlah: number }) =>
        axiosAuthClient.post("/order/keranjang", { produk_id, jumlah }),
      {
        onSuccess: () => {
          toastSuccess("Berhasil menambahkan ke keranjang");
          queryClient.invalidateQueries(["keranjang"]);
        },
      }
    );

  const checkoutKeranjang = () =>
    useMutation(
      (body: { selectedIds: number[] }) =>
        axiosAuthClient.post("/order/keranjang/checkout", body),
      {
        onSuccess: () => {
          toastSuccess("Checkout berhasil");
          queryClient.invalidateQueries(["keranjang"]);
          queryClient.invalidateQueries(["/order/all"]);
          queryClient.invalidateQueries(["riwayat-pesanan"]);
          queryClient.invalidateQueries(["pemasukan-ringkasan"]);
        },
        onError: () => toastError("Gagal checkout"),
      }
    );

  return {
    useProdukList,
    useCreateBulProduk,
    useDetailProduk,
    useUpdateProduk,
    useDeleteProduk,
    usePesanProduk,
    usePesananList,
    useDetailPesanan,
    useUpdatePesananStatus,
    useKategoriList,
    useDetaillKategori,
    useRiwayatPesanan,
    usePemasukan,
    useRingkasanPemasukan,
    useKeranjang,
    useTambahKeKeranjang,
    checkoutKeranjang,
  };
};

export default useProdukModule;