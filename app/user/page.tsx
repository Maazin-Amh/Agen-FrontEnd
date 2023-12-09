"use client";
import { Table, Th, Thead, Tr, Tbody, Td } from "@/components/Tabel";
import { dateUtil } from "@/utils";
import useUserModule from "./lib";
import Button from "@/components/Button";
import { Pagination } from "@/components/Pagination";
import { useDisclosure } from "@/hook";
import { Drawer } from "@/components/Drawer";
import Filter from "./module/filter";
import Search from "./module/search";
import { useRouter } from "next/navigation";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import { useConfirmDeleteBulk } from "@/hook/useConfrimBulkDelete";

const User = () => {
  const { useUserList, useDeleteUser, useDeleteBulkUser } = useUserModule();
  const { mutate, isLoading } = useDeleteUser();
  const { mutate: mutateDeleteBulk, isLoading: isLoadingDeleteBulk } =
    useDeleteBulkUser();
  const router = useRouter();
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  });

  const { onClose, isOpen, onOpen } = useDisclosure();
  const {
    data,
    handeFilter,
    params,
    isFetching,
    handleClear,
    handlePage,
    setParams,
    handlePageSize,
  } = useUserList();

  const { handleDeleteBulk, deletePayload, setDeletePayload, checked } =
  useConfirmDeleteBulk({
    data: data,
    onSubmit: (payload) => {
      mutateDeleteBulk(
        { delete: payload },
        {
          onSuccess: () => {
            setDeletePayload([]);
          },
        }
      );
    },
  });

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClear={handleClear}
        onSubmit={handeFilter}
        onClose={onClose}
        title="Filter User"
      >
        <Filter params={params} setParams={setParams} />
      </Drawer>
      <section className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex w-[50%]  gap-3 py-5">
            <Button
              title="Add +"
              width="filter"
              onClick={() => router.push("user/add")}
              colorSchema="teal"
            />
            <Button
              onClick={() => {
                router.push("/user/tambah-bulk");
              }}
              width="filter"
              colorSchema="green"
              title="tambah bulk"
            />
            <Button
              width="filter"
              onClick={() => {
                handleDeleteBulk(deletePayload);
              }}
              isLoading={isLoadingDeleteBulk}
              colorSchema="red"
              isDisabled={deletePayload.length === 0}
              title="Hapus Bulk"
            />
             <Button
              title="Filter"
              width="filter"
              onClick={onOpen}
              colorSchema="dark"
            />
          </div>
          <Search onchange={handeFilter} />
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th scope="col">
                <div className="flex items-center gap-x-3">
                  <input
                    checked={checked.isAllCheced}
                    onChange={() => {
                      if (checked.isAllCheced) {
                        setDeletePayload([]);
                      } else {
                        setDeletePayload((state) => {
                          if (!data) {
                            return [];
                          }

                          const selected: number[] = Array.from(
                            new Set([
                              ...state,
                              ...data?.data?.map((n) => Number(n.id)),
                            ])
                          );

                          return [...selected];
                        });
                      }
                    }}
                    type="checkbox"
                    className="accent-slate-950 w-4 h-4"
                  />
                </div>
              </Th>
              <Th scope="col">Nama</Th>
              <Th scope="col">Email</Th>
              <Th scope="col">Umur</Th>
              <Th scope="col">Tanggal Lahir</Th>
              <Th scope="col">Status</Th>
              <Th scope="col">Create</Th>
              <Th scope="col">Update</Th>
              <Th scope="col" className="text-center">Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <input
                    checked={deletePayload.includes(item.id || 0)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDeletePayload((state) => [...state, item.id || 0]);
                      } else {
                        const filtered = deletePayload.filter(
                          (n) => n !== item.id
                        );
                        setDeletePayload(filtered);
                      }
                    }}
                    type="checkbox"
                    className="accent-slate-950 w-4 h-4"
                  />
                </Td>
                <Td>
                  <span>{item.nama}</span>
                </Td>
                <Td>
                  <span>{item.email}</span>
                </Td>
                <Td>
                  <span>{item.umur}</span>
                </Td>
                <Td>
                  <span>{dateUtil.formatDateInd(item.tanggal_lahir)}</span>
                </Td>
                <Td>
                  <span>{item.status}</span>
                </Td>
                <Td>
                  <span>{dateUtil.formatDateIndLong(item.created_at)}</span>
                </Td>
                <Td>
                  <span>{dateUtil.formatDateIndLong(item.updated_at)}</span>
                </Td>
                <Td>
                  <DeleteButton
                    isLoading={isLoading}
                    onClick={() => {
                      handleDelete(item.id || 0);
                    }}
                  />
                  <EditButton
                    onClick={() => {
                      router.push(`user/${item.id}/edit`);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          {/* <DeleteButton
                  isLoading= {isLoading}
                    onClick={() => {
                      handleDelete(item.id || 0)
                    }}
                  /> */}
        </Table>
        <Pagination
          page={params.page}
          pageSize={params.pageSize}
          handlePageSize={handlePageSize}
          handlePage={handlePage}
          pagination={data?.pagination}
        />
      </section>
    </>
  );
};

export default User;
