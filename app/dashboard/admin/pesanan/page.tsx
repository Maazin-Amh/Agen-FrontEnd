"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useProdukModule from "../../lib";
import { BadgeCheck, Clock, Truck } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";

// Grouping helper
function groupPesananByTransaksi(pesananList: any[]) {
  const grouped: Record<string, any[]> = {};
  for (const p of pesananList) {
    const kode = p.kode_transaksi ?? "no_group";
    if (!grouped[kode]) grouped[kode] = [];
    grouped[kode].push(p);
  }
  return grouped;
}

// Badge UI
const statusBadge = (status: string) => {
  switch (status) {
    case "menunggu":
      return (
        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
          <Clock size={14} /> Menunggu
        </span>
      );
    case "diantar":
      return (
        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
          <Truck size={14} /> Diantar
        </span>
      );
    case "sudah_sampai":
      return (
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
          <BadgeCheck size={14} /> Sudah Sampai
        </span>
      );
  }
};

const DaftarPesananPage = () => {
  const { usePesananList, useUpdatePesananStatus } = useProdukModule();
  const { data, isLoading } = usePesananList();
  const { mutate: updateStatus, isLoading: isUpdating } =
    useUpdatePesananStatus();
  const router = useRouter();

  const [groupStatus, setGroupStatus] = useState<Record<string, string>>({});

  const filtered = data?.data.filter(
    (pesanan) => pesanan.status !== "sudah_sampai"
  );
  const grouped = groupPesananByTransaksi(filtered ?? []);

  if (isLoading) return <p className="p-6">Memuat daftar pesanan...</p>;

  return (
    <main className="p-6">
      <div className="flex items-center mb-6 gap-3">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          Daftar Semua Pesanan
        </h1>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-500">Tidak ada pesanan yang sedang diproses.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(grouped).map(([kode, pesananList], index) => {
            const total = pesananList.reduce((acc, p) => acc + p.total, 0);
            const first = pesananList[0];
            const status = groupStatus[kode] || first.status;

            return (
              <div
                key={index}
                className="bg-white shadow border border-gray-200 rounded-xl flex flex-col"
              >
                {/* Header */}
                <div className="flex justify-between items-start p-5 pb-3 border-b">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Transaksi: {kode}
                    </h2>
                    {statusBadge(status)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(first.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Produk List Scrollable */}
                <div
                  className={`px-5 pt-3 space-y-1 text-sm text-gray-700 ${
                    pesananList.length > 2
                      ? "max-h-64 overflow-y-auto pr-2"
                      : ""
                  }`}
                >
                  {pesananList.map((item, i) => (
                    <div key={i} className="border-b pb-2 mb-2">
                      <p>
                        <strong>Produk:</strong> {item.produk.nama_produk}
                      </p>
                      <p>
                        <strong>Jumlah:</strong> {item.jumlah}
                      </p>
                      <p>
                        <strong>Subtotal:</strong> Rp{" "}
                        {item.total.toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Info Pembeli */}
                <div className="px-5 pt-3 pb-2 text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>Total Transaksi:</strong> Rp{" "}
                    {total.toLocaleString("id-ID")}
                  </p>
                  <p>
                    <strong>Nama Pembeli:</strong> {first.customer_by?.nama}
                  </p>
                  <p>
                    <strong>Alamat:</strong> {first.customer_by?.alamat}
                  </p>
                </div>

                {/* Dropdown Status */}
                <div className="p-5 pt-2 mt-auto border-t">
                  <label className="text-sm font-medium text-gray-600 mr-2">
                    Ubah Status:
                  </label>
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    value={status}
                    onChange={(e) => {
                      const newStatus = e.target.value as
                        | "menunggu"
                        | "diantar"
                        | "sudah_sampai";

                      setGroupStatus((prev) => ({
                        ...prev,
                        [kode]: newStatus,
                      }));
                      updateStatus({
                        kode_transaksi: first.kode_transaksi,
                        status: newStatus,
                      });
                    }}
                    disabled={isUpdating}
                  >
                    <option value="menunggu">Menunggu</option>
                    <option value="diantar">Diantar</option>
                    <option value="sudah_sampai">Sudah Sampai</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default DaftarPesananPage;
