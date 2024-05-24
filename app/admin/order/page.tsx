"use client";
import Button from "@/components/Button";
import useProdukModule from "./lib";
import { useRouter } from "next/navigation";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import useOrderModule from "./lib";
import { useSession } from "next-auth/react";

const Order = () => {
  const { useOrder, useDeleteOrder } = useOrderModule();
  const { mutate, isLoading } = useDeleteOrder();
  const {
    data,
    isFetching,
    params,
    setParams,
    handeFilter,
    handleClear,
    handlePageSize,
    handlePage,
  } = useOrder();
  const { data: session, status } = useSession();
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
                    router.push("/admin/order/tambah");
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
                          No
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          ID
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Nomor Order
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          status Order
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Total Bayar
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          action
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-end" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {data?.data.map((order, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50 ">
                      <td className="size-px whitespace-nowrap">
                        <button
                          type="button"
                          className="block"
                          data-hs-overlay="#hs-ai-invoice-modal"
                        >
                          <span className="block px-6 py-2">
                            <span className="font-mono text-sm text-blue-600 ">
                              {order.id}
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
                              {order.nomor_order}
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
                              {order.tanggal_order}
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
                              {order.status}
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
                              {order.total_bayar}
                            </span>
                          </span>
                        </button>
                      </td>
                      <div className="space-x-10">
                        <EditButton
                          onClick={() => {
                            router.push(`/admin/produk/${order.id}/update`);
                          }}
                        />
                        <DeleteButton
                          isLoading={isLoading}
                          onClick={() => {
                            handleDelete(order.id || 0);
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

export default Order;
