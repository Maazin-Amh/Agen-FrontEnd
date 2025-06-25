// // /* eslint-disable react-hooks/exhaustive-deps */
// // "use client";

// // const Home = () => {
// //   return (
// //     <div className="bg-black/50 relative backdrop-blur-2xl">
// //       <span className="absolute top-0 right-0 translate-x-1/2 -z-10">
// //         <h1 className="text-black text-5xl text-center font-bold">
// //           Welcome to NextJS
// //         </h1>
// //       </span>
// //     </div>
// //   );
// // };

// // export default Home;



// // "use client";

// import { useState } from "react";
// import useProdukModule from "../lib";
// import { useToast } from "@/hook/useToast";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// export default function CustomerPage() {
//   const { useProdukList, usePesanProduk } = useProdukModule();
//   const { data } = useProdukList();
//   const router = useRouter();
//   const { toastError, toastSuccess } = useToast();
//   const { mutate: beliProduk, isLoading } = usePesanProduk();

//   const [jumlahMap, setJumlahMap] = useState<Record<number, number>>({});

//   const handleChangeJumlah = (id: number, value: number) => {
//     setJumlahMap((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleBeli = (produkId: number) => {
//     const jumlah = jumlahMap[produkId] || 1;

//     if (!jumlah || jumlah <= 0) {
//       toastError();
//       return;
//     }

//     // ✅ Konfirmasi sebelum beli
//     Swal.fire({
//       title: "Konfirmasi Pembelian",
//       text: `Apakah kamu yakin ingin membeli ${jumlah} produk ini?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#2563eb",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, Beli",
//       cancelButtonText: "Batal",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         beliProduk(
//           { produkId, jumlah },
//           {
//             onSuccess: (response) => {
//               toastSuccess("Berhasil memesan produk");
//               const pesananId = response?.data?.data?.id;

//               if (pesananId) {
//                 router.push(`/dashboard/customer/detail/${pesananId}`);
//               } else {
//                 console.error("❌ ID pesanan tidak ditemukan dalam response");
//               }

//               setJumlahMap((prev) => ({ ...prev, [produkId]: 1 }));
//             },
//             onError: () => {
//               toastError();
//             },
//           }
//         );
//       }
//     });
//   };

//   return (
//     <main className="p-6">
//       <h1 className="text-xl font-bold mb-4">Daftar Produk</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data?.data.map((produk, index) => (
//           <div key={index} className="border rounded-lg p-4 shadow">
//             <p className="font-semibold text-lg">{produk.nama_produk}</p>
//             <p>Harga: Rp {produk?.harga?.toLocaleString()}</p>
//             <p>Stok: {produk.stok}</p>
//             <p className="mt-1">Terjual: {produk.terjual || 0}</p>
//             <input
//               type="number"
//               min={1}
//               max={produk?.stok || 0}
//               className="mt-2 w-full border rounded px-2 py-1"
//               placeholder="Jumlah"
//               value={jumlahMap[produk?.id || 0]}
//               onChange={(e) =>
//                 handleChangeJumlah(produk?.id || 0, Number(e.target.value))
//               }
//             />
//             <button
//               className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//               onClick={() => handleBeli(produk?.id || 0)}
//               disabled={(produk.stok ?? 0) <= 0 || isLoading}
//             >
//               {isLoading ? "Memproses..." : "Beli"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }