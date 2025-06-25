"use client";

import useProdukModule from "@/app/dashboard/lib";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function KatPage({ params }: { params: { id: string } }) {
  const { useDetaillKategori } = useProdukModule();
  const { data, isLoading } = useDetaillKategori(params.id);
  const router = useRouter();

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <>
      <Header />
      <main className="px-4 flex flex-col gap-4 md:px-10 py-6">
        <div className=" flex gap-4">
          <h2>
            Produk hanya bisa di kirim di sekitaran wilayah bekasi. untuk
            selebihnya belum terjangkau
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.isArray(data) &&
            data.map((item, index) => (
              <div key={index} className="bg-white border transition">
                <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                  {item.files ? (
                    <img
                      src={item.files}
                      alt={item.nama_produk}
                      width={300}
                      height={300}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Tidak ada gambar
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col items-center">
                  <p className="text-sm text-center font-medium min-h-[3rem]">
                    {item.nama_produk}
                  </p>
                  <span className="flex gap-9">
                    <p className="text-green-800 font-semibold mt-1">
                      Rp {item.harga?.toLocaleString()}
                    </p>
                    <p className="mt-1">Stock :{item.stok}</p>
                  </span>
                  <button
                    className={`w-full px-4 py-1 mt-2 rounded text-sm text-white 
    ${
      item.stok < 1
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-900 hover:bg-green-800"
    }
  `}
                    onClick={() =>
                      router.push(`/dashboard/produk/detail/${item.id}`)
                    }
                    disabled={item.stok < 1}
                  >
                    {item.stok < 1 ? "Stok Habis" : "Beli"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
