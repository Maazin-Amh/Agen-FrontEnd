"use client";
import Button from "@/components/Button";
import useProdukModule from "./lib";
import { useRouter } from "next/navigation";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import useKategoriModule from "./lib";
import { useConfirmDelete } from "@/hook/useConfirmDelete";

const Kategori = () => {
  const { useKategoriList, useDeleteKategori } = useKategoriModule();
  const { mutate, isLoading } = useDeleteKategori();
  const { data } = useKategoriList();
  const router = useRouter();
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  });

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
                    router.push("/admin/kategori/tambah");
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
                          Nama Kategori
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Create ID
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-end" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {data?.data.map((kategori, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50 ">
                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          data-hs-overlay="#hs-ai-invoice-modal"
                        >
                          <span className="block px-6 py-2">
                            <span className="text-sm text-gray-600 ">
                              {kategori.nama_kategori}
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
                              {kategori.created_by.id}
                            </span>
                          </span>
                        </button>
                      </td>
                      <div className="space-x-10">
                        <EditButton
                          onClick={() => {
                            router.push(`kategori/${kategori.id}/update`);
                          }}
                        />
                        <DeleteButton
                          isLoading={isLoading}
                          onClick={() => {
                            handleDelete(kategori.id || 0);
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
    </main>
  );
};

export default Kategori;
