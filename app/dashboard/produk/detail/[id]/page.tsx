"use client";

import { useState } from "react";
import useProdukModule from "@/app/dashboard/lib";
import { useToast } from "@/hook/useToast";
import { useRouter } from "next/navigation";
import ModalBeli from "@/hook/useConfrimOrder";
import { useDisclosure } from "@chakra-ui/react";
import Header from "@/components/header";

export default function DetailProduk({ params }: { params: { id: string } }) {
  const { useDetailProduk, usePesanProduk, useTambahKeKeranjang } = useProdukModule();

const { mutate: tambahKeKeranjang } = useTambahKeKeranjang();
  const { data, isFetching } = useDetailProduk(params.id);
  const { toastError, toastSuccess } = useToast();
  const { mutate: beliProduk, isLoading } = usePesanProduk();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [jumlah, setJumlah] = useState<number>(1);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const handleBeli = () => {
    if (!jumlah || jumlah <= 0) {
      toastError();
      return;
    }
    setShowModal(true);
  };

  const handleTambahKeKeranjang = () => {
  if (!jumlah || jumlah <= 0) {
    toastError("Jumlah tidak valid");
    return;
  }

  tambahKeKeranjang(
    { produk_id: data?.id ?? 0, jumlah },
    {
      onSuccess: () => {
        toastSuccess("Produk ditambahkan ke keranjang");
      },
      onError: () => toastError("Gagal menambahkan ke keranjang"),
    }
  );
};

  const handleConfirmBeli = () => {
    if (!jumlah || jumlah <= 0 || jumlah > (data?.stok ?? 0)) {
      toastError();
      return;
    }

    beliProduk(
      { produkId: data?.id ?? 0, jumlah },
      {
        onSuccess: (response) => {
          toastSuccess("Berhasil memesan produk");
          const pesananId = response?.data?.data?.id;
          if (pesananId) {
            router.push(`/dashboard/customer/detail/${pesananId}`);
          }
          setJumlah(1);
        },
        onError: () => toastError(),
        onSettled: () => {
          closeModal();
        },
      }
    );
  };

  if (isFetching || !data) {
    return <p className="p-6 text-gray-600">Memuat detail produk...</p>;
  }

  return (
    <>
          <Header />
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Detail Produk</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-auto border rounded overflow-hidden">
          {data?.files ? (
            <img
              src={data.files}
              alt={data.nama_produk}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-500">
              Tidak ada gambar
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">{data.nama_produk}</h2>
          <p className="text-gray-700 mb-2">
            Deskripsi: {data.deskripsi_produk}
          </p>
          <p className="text-gray-700 mb-2">
            Harga Satuan: Rp {data.harga?.toLocaleString()}
          </p>
          <p className="text-gray-700 mb-2">Stok: {data.stok}</p>
          <p className="text-gray-700 mb-2">Terjual: {data.terjual}</p>
          <p className="text-gray-700 mb-4">
            Kategori: {data?.kategori?.nama_kategori}
          </p>
          <div className="flex items-center mb-4">
            <div className="py-2 px-3 bg-white border border-gray-200 rounded-lg ">
              <div className="w-full flex justify-between items-center gap-x-3">
                <div>
                  <span className="block font-medium text-sm text-gray-800 ">
                    Total
                  </span>
                  <span className="block text-xs text-gray-500 ">
                    Rp. {((data.harga ?? 0) * jumlah).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center gap-x-1.5">
                  <button
                    onClick={() => setJumlah((prev) => Math.max(1, prev - 1))}
                    className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      className="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={jumlah}
                    min={1}
                    max={data.stok || 1}
                    onChange={(e) => setJumlah(Number(e.target.value))}
                    className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
                  />
                  <button
                    onClick={() => setJumlah((prev) => prev + 1)}
                    className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                  >
                    <svg
                      className="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="w-full bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
             onClick={handleTambahKeKeranjang}
          >
            {isLoading
              ? "Memproses..."
              : (data.stok ?? 0) < 1
              ? "Stok Habis"
              : jumlah > (data.stok ?? 0)
              ? "Stok Terbatas"
              : "Beli"}
          </button>

          <ModalBeli
            isOpen={isModalOpen}
            onClose={closeModal}
            jumlah={jumlah}
            onConfirm={handleConfirmBeli}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
    </>
  );
}
