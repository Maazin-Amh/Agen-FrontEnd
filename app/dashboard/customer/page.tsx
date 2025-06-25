"use client";

import { useRouter } from "next/navigation";
import useProdukModule from "../lib";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/Pagination";
import { FileSearch } from "lucide-react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const Customer = () => {
  const { useKategoriList, useProdukList } = useProdukModule();
  const { data: kategoriList } = useKategoriList();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showKategori, setShowKategori] = useState(true);
  const {
    data: dataProduk,
    handeFilter,
    params,
    isFetching,
    handleClear,
    handlePage,
    setParams,
    handlePageSize,
  } = useProdukList();

  useEffect(() => {
    if (searchValue === "") {
      setShowKategori(true);
      handeFilter({ target: { value: "" } });
    }
  }, [searchValue]);

  return (
    <div className="w-full flex flex-col">
      <header className="w-full bg-white sticky py-4 px-6 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold cursor-pointer text-green-800">
          Agen Store Bekasi
        </h1>
        <div className="flex gap-5">
            <button
            onClick={() => router.push(`/dashboard/customer/keranjang`)}
          >
         <FaShoppingCart className="w-6 h-6" />
          </button>
          <button
            className="py-3 px-4 text-sm font-medium rounded-lg bg-green-800 text-white hover:bg-gray-900"
            onClick={() => router.push(`/dashboard/customer/riwayat`)}
          >
            Riwayat Pesanan
          </button>
          <button
            onClick={() => router.push(`/dashboard/customer/profile`)}
            className="rounded-full object-cover w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer"
          />
        </div>
      </header>

      <section className="relative h-64 w-full bg-cover bg-center bg-[url('/bg-utama.jpg')]">
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-3xl font-bold">Toko Agen Bekasi</h2>
          <p className="text-lg">Hanya tersedia di wilayah bekasi</p>
          <div className="mt-4 w-full max-w-md flex">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handeFilter({ target: { value: searchValue } });
                  setShowKategori(false);
                }
              }}
              className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <button
              onClick={() => {
                handeFilter({ target: { value: searchValue } });
                setShowKategori(false);
              }}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-r-md"
            >
              <FileSearch size={18} />
            </button>
          </div>
        </div>
      </section>

      {showKategori && (
        <section className="py-10 px-4 md:px-16">
          <h3 className="text-2xl font-bold text-left mb-8">Kategori Produk</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {kategoriList?.data.map((kat, index) => (
              <div
                key={index}
                onClick={() =>
                  router.push(`/dashboard/produk/kategori/${kat.id}`)
                }
                className="flex flex-col items-center justify-center p-4 border rounded hover:shadow cursor-pointer"
              >
                <img
                  src={kat.foto}
                  className="w-16 h-16 rounded-full mb-2"
                  alt=""
                />
                <p className="text-center text-sm font-medium">
                  {kat.nama_kategori}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-10 px-4 md:px-16">
        <h3 className="text-2xl font-bold text-left mb-8">Semua Produk</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {dataProduk?.data.map((item, index) => (
            <div key={index} className="bg-white rounded border transition">
              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                {item.files ? (
                  <img
                    src={item.files}
                    alt={item.nama_produk}
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
                  <p className="text-green-600 font-semibold mt-1">
                    Rp {item.harga?.toLocaleString()}
                  </p>
                  <p className="mt-1">Stok : {item.stok}</p>
                </span>
                <button
                  className={`w-full px-4 py-1 mt-2 rounded text-sm text-white ${
                    (item.stok ?? 0) < 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={() =>
                    router.push(`/dashboard/produk/detail/${item.id}`)
                  }
                  disabled={(item.stok ?? 0) < 1}
                >
                  {(item.stok ?? 0) < 1 ? "Stok Habis" : "Beli"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          page={params.page}
          pageSize={params.pageSize}
          handlePageSize={handlePageSize}
          handlePage={handlePage}
          pagination={dataProduk?.pagination}
        />
      </section>

      <footer className="bg-green-800 text-white text-sm py-8 px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-2">Hubungi Kami</h4>
            <ul className="space-y-1">
              <li>WhatsApp</li>
              <li>Email</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Ikuti Kami</h4>
            <ul className="space-y-1">
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>
        </div>
      </footer>

      <a
        href="http://wa.me/6281311295106"
        target="_blank"
        className="fixed -bottom-2 -right-9 z-50 p-2"
      >
        <img src="/whatsapp-ico.png" alt="" className="h-16 md:h-20" />
      </a>
    </div>
  );
};

export default Customer;
