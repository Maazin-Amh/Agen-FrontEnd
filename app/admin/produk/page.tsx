"use client";
import Button from "@/components/Button";
import useProdukModule from "./lib";
import { useRouter } from "next/navigation";
import { EditButton } from "@/components/ButtonAction";

const Produk = () => {
  const { useProdukList } = useProdukModule();
  const { data } = useProdukList();
  const router = useRouter();

  return (
    <main className="bg-white border m-10 border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* {JSON.stringify(data?.data)} */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ">
             <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
             <button
                onClick={() => {
                  router.push("/admin/produk/tambah");
                }}
                className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Create
              </button>
             </div>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Barcode
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Nama
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Harga
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Stock
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Kategori ID
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-end" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {data?.data.map((produk, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50 ">
                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          data-hs-overlay="#hs-ai-invoice-modal"
                        >
                          <span className="block px-6 py-2">
                            <span className="font-mono text-sm text-blue-600 ">
                              #{produk.barcode}
                            </span>
                          </span>
                        </button>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          data-hs-overlay="#hs-ai-invoice-modal"
                        >
                          <span className="block px-6 py-2">
                            <span className="text-sm text-gray-600 ">
                              {produk.nama_produk}
                            </span>
                          </span>
                        </button>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          data-hs-overlay="#hs-ai-invoice-modal"
                        >
                          <span className="block px-6 py-2">
                            <span className="text-sm text-gray-600 ">
                              {produk.harga}
                            </span>
                          </span>
                        </button>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          data-hs-overlay="#hs-ai-invoice-modal"
                        >
                          <span className="block px-6 py-2">
                            <span className="text-sm text-gray-600 ">
                              {produk.stok}
                            </span>
                          </span>
                        </button>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          data-hs-overlay="#hs-ai-invoice-modal"
                        >
                          <span className="block px-6 py-2">
                            <span className="text-sm text-gray-600 ">
                              {produk.kategori.id}
                            </span>
                          </span>
                        </button>
                      </td>
                      <EditButton
                    onClick={() => {
                      router.push(`produk/${produk.id}/update`);
                    }}
                  />
                    </tr>
                    
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Produk;
