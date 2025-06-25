"use client";

import Header from "@/components/header";
import useProdukModule from "../../lib";

export default function RiwayatPesanan() {
  const { useRiwayatPesanan } = useProdukModule();
  const { data, isLoading } = useRiwayatPesanan();

  if (isLoading) return <p>Memuat riwayat pesanan...</p>;

  if (!data || data.length === 0) return <p>Belum ada pesanan</p>;

  return (
    <>
      <Header />
      <div className="space-y-4 m-10">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Nama Produk
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Jumlah
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Total bayar
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Tanggal Pesan
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data?.map((pesanan: any, index: any) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {" "}
                          {pesanan.produk.nama_produk}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {pesanan.jumlah}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          Rp {pesanan.total.toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {pesanan.status}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {new Date(pesanan.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
