"use client";

import { useRouter } from "next/navigation";
import useProdukModule from "../../lib";
import { BadgeCheck } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";

// 🔹 Fungsi grup berdasarkan kode_transaksi
function groupPesananByTransaksi(pesananList: any[]) {
  const grouped: Record<string, any[]> = {};
  for (const p of pesananList) {
    const kode = p.kode_transaksi ?? "no_group";
    if (!grouped[kode]) grouped[kode] = [];
    grouped[kode].push(p);
  }
  return grouped;
}

const RiwayatPesananPage = () => {
  const { usePesananList } = useProdukModule();
  const { data, isLoading } = usePesananList();
  const router = useRouter();

  if (isLoading) return <p className="p-6">Memuat riwayat pesanan...</p>;

  const riwayat = data?.data.filter((p) => p.status === "sudah_sampai");
  const grouped = groupPesananByTransaksi(riwayat ?? []);

  const handlePrint = (pesananList: any[], kode_transaksi: string) => {
    const first = pesananList[0];
    const tanggalCetak = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const printWindow = window.open("", "", "width=400,height=600");

    const itemsHTML = pesananList
      .map(
        (item: any) => `
        <div>
          <div>Produk: ${item.produk?.nama_produk}</div>
          <div>Jumlah: ${item.jumlah}</div>
          <div>Subtotal: Rp ${item.total.toLocaleString("id-ID")}</div>
          <hr />
        </div>`
      )
      .join("");

    const total = pesananList.reduce((acc, p) => acc + p.total, 0);

    printWindow?.document.write(`
    <html>
      <head>
        <title>Struk Pesanan</title>
        <style>
          @media print {
            body {
              width: 58mm;
              font-family: monospace;
              font-size: 12px;
              margin: 0;
              padding: 0;
            }
          }
          body {
            font-family: monospace;
            font-size: 12px;
            margin: 0;
            padding: 10px;
            width: 58mm;
          }
          h2 {
            text-align: center;
            font-size: 14px;
            margin-bottom: 10px;
          }
          .line {
            border-top: 1px dashed #000;
            margin: 5px 0;
          }
          .footer {
            margin-top: 15px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h2>Struk Pesanan</h2>
        <div>Agen Store</div>
        <div>Kode Transaksi: ${kode_transaksi}</div>
        <div>Tanggal Pesanan: ${new Date(first.created_at).toLocaleDateString("id-ID")}</div>
        <div>Alamat: Jl. Celebration Boulevard, Lambangjaya, Kec. Tambun Sel., Kabupaten Bekasi, Jawa Barat 17510</div>
        <div class="line"></div>
        ${itemsHTML}
        <div class="line"></div>
        <div><strong>Total: Rp ${total.toLocaleString("id-ID")}</strong></div>

        <div class="footer">
          <div>Tanggal Cetak: ${tanggalCetak}</div>
          <div>Terima kasih!</div>
        </div>

        <script>
          window.print();
          setTimeout(() => window.close(), 500);
        </script>
      </body>
    </html>
  `);
  };

  return (
    <main className="p-6">
      <div className="flex items-center mb-5 gap-3">
        <button onClick={() => router.back()} className="">
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Riwayat Pesanan Selesai</h1>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-500">Belum ada riwayat pesanan selesai.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(grouped).map(([kode, pesananList], index) => {
            const first = pesananList[0];
            const total = pesananList.reduce((acc, p) => acc + p.total, 0);

            return (
              <div
                key={index}
                className="bg-white shadow border border-gray-200 rounded-lg flex flex-col"
              >
                {/* Header */}
                <div className="flex justify-between items-start p-5 pb-3 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">Transaksi: {kode}</h2>
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    <BadgeCheck size={14} /> Sudah Sampai
                  </span>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto px-5 pt-3 space-y-1 text-sm text-gray-700 max-h-64">
                  {pesananList.map((item, i) => (
                    <div key={i} className="border-b pb-2 mb-2">
                      <p><strong>Produk:</strong> {item.produk.nama_produk}</p>
                      <p><strong>Jumlah:</strong> {item.jumlah}</p>
                      <p><strong>Subtotal:</strong> Rp {item.total.toLocaleString("id-ID")}</p>
                    </div>
                  ))}
                  <p><strong>Total Transaksi:</strong> Rp {total.toLocaleString("id-ID")}</p>
                  <p><strong>Nama Pembeli:</strong> {first.customer_by?.nama}</p>
                  <p><strong>Alamat:</strong> {first.customer_by?.alamat}</p>
                  <p><strong>Tanggal:</strong> {new Date(first.created_at).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric"
                  })}</p>
                </div>

                {/* Tombol Cetak */}
                <div className="p-5 pt-3 border-t mt-auto">
                  <button
                    onClick={() => handlePrint(pesananList, kode)}
                    className="w-full px-3 py-2 text-sm bg-green-800 text-white rounded hover:bg-green-700"
                  >
                    Cetak Struk
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default RiwayatPesananPage;