"use client";
import Button from "@/components/Button";
import useProdukModule from "../lib";
import { useRouter } from "next/navigation";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import { formatRupiahIntl } from "@/utils/rupiah.utils";
import Chart from "@/components/Chart";

const Admins = () => {
  const { useProdukList, useDeleteProduk, usePemasukan } = useProdukModule();
  const { mutate, isLoading } = useDeleteProduk();
  const { data: pemasukan } = usePemasukan();
  const { data } = useProdukList();
  const router = useRouter();
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  });

  return (
    <main className="m-10">
      {" "}
      <Chart />
      <section>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border mt-3 border-gray-200 rounded-xl shadow-sm overflow-hidden ">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-start md:items-center border-b border-gray-200 ">
                  <button
                    onClick={() => {
                      router.push("/dashboard/produk/create-product");
                    }}
                    className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-800 text-white "
                  >
                    {/* <svg
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
                    </svg> */}
                    Buat Produk
                  </button>

                  <button
                    onClick={() => {
                      router.push("/dashboard/admin/pesanan");
                    }}
                    className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-600 text-white "
                  >
                    Pesanan
                  </button>
                  <button
                    onClick={() => {
                      router.push("/dashboard/admin/riwayat");
                    }}
                    className="py-2 px-3  inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-slate-600 text-white "
                  >
                    Riwayat Pesanan
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
                            Kategori
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
                            Terjual
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Edit
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-end" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    {data?.data.map((produk, index) => (
                      <tr key={index} className="bg-white ">
                        <td className="size-px">
                          <button
                            type="button"
                            className="block"
                            data-hs-overlay="#hs-ai-invoice-modal"
                          >
                            <span className="block px-6 py-2">
                              <span className="font-mono text-sm text-green-800 ">
                                #{produk.barcode}
                              </span>
                            </span>
                          </button>
                        </td>
                        <td className="size-px">
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
                        <td className="size-px">
                          <button
                            type="button"
                            className="block"
                            data-hs-overlay="#hs-ai-invoice-modal"
                          >
                            <span className="block px-6 py-2">
                              <span className="text-sm text-gray-600 ">
                                {produk.kategori.nama_kategori}
                              </span>
                            </span>
                          </button>
                        </td>

                        <td className="size-px">
                          <button
                            type="button"
                            className="block"
                            data-hs-overlay="#hs-ai-invoice-modal"
                          >
                            <span className="block px-6 py-2">
                              <span className="text-sm text-gray-600 ">
                                {formatRupiahIntl(produk.harga)}
                              </span>
                            </span>
                          </button>
                        </td>
                        <td className="size-px">
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
                        <td className="size-px">
                          <button
                            type="button"
                            className="block"
                            data-hs-overlay="#hs-ai-invoice-modal"
                          >
                            <span className="block px-6 py-2">
                              <span className="text-sm text-gray-600 ">
                                {produk.terjual || 0}
                              </span>
                            </span>
                          </button>
                        </td>
                        <div className="block px-6 py-2 space-x-8">
                          <EditButton
                            onClick={() => {
                              router.push(`produk/update/${produk.id}`);
                            }}
                          />
                          <DeleteButton
                            isLoading={isLoading}
                            onClick={() => {
                              handleDelete(produk.id || 0);
                            }}
                          />
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Admins;
