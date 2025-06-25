"use client";

import useProdukModule from "@/app/dashboard/lib";

export default function PemasukanHarian() {
  const { useRingkasanPemasukan } = useProdukModule();
  const { data, isLoading } = useRingkasanPemasukan();

  const pemasukan = data?.hari_ini;
  const pemasukanKemarin = data?.kemarin;

  const totalHariIni = pemasukan?.total || 0;
  const totalKemarin = pemasukanKemarin?.total || 0;

  const perubahan =
    totalKemarin > 0
      ? ((totalHariIni - totalKemarin) / totalKemarin) * 100
      : totalHariIni > 0
      ? 100
      : 0;

  const isNaik = perubahan >= 0;
  const warna = isNaik ? "text-green-600" : "text-red-600";
  const icon = isNaik ? "▲" : "▼";

  if (isLoading) return <p>Memuat data pemasukan...</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* 🔹 Total Pemasukan Hari Ini */}
      <div className="flex flex-col gap-y-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-sm text-gray-500 font-medium">
          Pemasukan Hari Ini
        </h2>
        <p className="text-3xl font-bold text-gray-800 mt-1">
          Rp {totalHariIni.toLocaleString("id-ID")}
        </p>
      </div>

      {/* 🔹 Jumlah Pesanan Hari Ini */}
      <div className="flex flex-col gap-y-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-sm text-gray-500 font-medium">
          Jumlah Pesanan Hari Ini
        </h2>
        <p className="text-3xl font-bold text-gray-800 mt-1">
          {pemasukan?.jumlah_pesanan ?? 0}
        </p>
      </div>

      {/* 🔹 Persentase Kenaikan Dibanding Kemarin */}
      <div className="flex flex-col gap-y-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-sm text-gray-500 font-medium">
          Perbandingan dengan Kemarin
        </h2>
        <p className={`text-2xl font-semibold ${warna} mt-1`}>
          {icon} {Math.abs(perubahan).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
