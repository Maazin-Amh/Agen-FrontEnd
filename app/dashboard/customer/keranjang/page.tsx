"use client";
import { useState } from "react";
import useProdukModule from "../../lib";
import { useToast } from "@/hook/useToast";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function KeranjangPage() {
  const { useKeranjang, checkoutKeranjang } = useProdukModule();
  const { data: keranjang, isLoading } = useKeranjang();
  const checkout = checkoutKeranjang();
  const router = useRouter();
  const { toastError, toastSuccess } = useToast();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheckout = () => {
    if (selectedIds.length === 0) {
      toastError("Pilih minimal satu produk untuk checkout");
      return;
    }

    checkout.mutate(
      { selectedIds },
      {
        onSuccess: () => toastSuccess("Checkout berhasil"),
        onError: (error) => {
          console.error("Checkout error:", error);
          toastError("Gagal checkout");
        },
      }
    );
  };

  const total = keranjang?.reduce(
    (acc: any, item: any) =>
      selectedIds.includes(item.id)
        ? acc + item.jumlah * item.produk.harga
        : acc,
    0
  );

  if (isLoading)
    return <p className="text-center py-10">Memuat keranjang...</p>;

  return (
    <main className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex gap-3 items-center">
        <button
          onClick={() => router.push("/dashboard/customer")}
          className="p-5"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold ">Keranjang Saya</h1>
      </div>

      {keranjang?.length === 0 ? (
        <p className="text-center">Keranjang kosong</p>
      ) : (
        <>
          <div className="space-y-4">
            {keranjang.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white shadow-sm rounded-xl p-4"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="w-5 h-5 accent-green-600"
                />

                <img
                  src={item.produk?.files || "/no-image.png"}
                  alt={item.produk.nama_produk}
                  className="w-20 h-20 object-cover rounded-md border"
                />

                <div className="flex-1">
                  <h2 className="text-base md:text-lg font-medium text-gray-800">
                    {item.produk.nama_produk}
                  </h2>
                  <p className="text-sm text-gray-500">Jumlah: {item.jumlah}</p>
                  <p className="text-sm text-gray-700 font-semibold mt-1">
                    Rp{" "}
                    {(item.jumlah * item.produk.harga).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed md:static bottom-0 left-0 w-full bg-white md:bg-transparent md:mt-6 border-t md:border-none p-4 md:p-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <p className="font-bold text-lg text-gray-800">
                Total: Rp {total?.toLocaleString("id-ID")}
              </p>
              <button
                onClick={handleCheckout}
                className="w-full md:w-auto px-6 py-3 bg-green-800 text-white font-medium rounded-lg hover:bg-green-700 transition"
              >
                Checkout Sekarang
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
