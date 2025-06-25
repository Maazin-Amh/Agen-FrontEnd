"use client";

import useProdukModule from "@/app/dashboard/lib";
import Header from "@/components/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function DetailPesanan({ params }: { params: { id: string } }) {
  const { useDetailPesanan } = useProdukModule();
  const { data, isFetching } = useDetailPesanan(params.id);
  const router = useRouter();

  if (isFetching || !data) {
    return <p className="p-6 text-gray-600">Memuat detail pesanan...</p>;
  }

  const { produk, jumlah, status, customer_by, total } = data;

  return (
    <>
      <button
        onClick={() => router.push("/dashboard/customer")}
        className="p-5"
      >
        <FaArrowLeft />
      </button>
      <div className="max-w-4xl mx-auto mt-8 border rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Detail Pesanan
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 px-6 py-6">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {produk.nama_produk}
            </h3>

            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Jumlah:</span> {jumlah}
            </div>

            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`inline-block px-2 py-0.5 rounded text-white text-xs ${
                  status === "menunggu"
                    ? "bg-yellow-500"
                    : status === "diantar"
                    ? "bg-blue-500"
                    : "bg-green-600"
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t text-sm text-gray-700 bg-gray-50">
          <p>
            <span className="font-medium">Pembeli:</span> {customer_by.nama}
          </p>
          <p>
            <span className="font-medium">Alamat:</span> {customer_by.alamat}
          </p>
          <p>
            <span className="font-medium">Pembayaran:</span> Cash / Tunai
          </p>
          <p>
            <span className="font-medium">Total Pembayaran:</span> Rp{" "}
            {total.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <h1 className="text-2xl text-center mt-3 font-bold text-red-500">
        {" "}
        PESANAN ANDA AKAN BISA LIHAT DI RIWAYAT PESANAN
      </h1>
    </>
  );
}
