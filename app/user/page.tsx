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

const User = () => {
  const { useUserList } = useUserModule();
  const router = useRouter();
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
              colorSchema="red"
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
                <div className="flex justify-center items-center ">
                  <input
                    type="checkbox"
                    className="border-gray-300 accent-slate-900  w-4 h-4"
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
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <span>
                    {
                      <div className="flex w-full justify-center items-center ">
                        <input
                          type="checkbox"
                          className="border-gray-300 accent-slate-900 w-4 h-4"
                        />
                      </div>
                    }
                  </span>
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
                  <span>{item.tanggal_lahir}</span>
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
              </Tr>
            ))}
          </Tbody>
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
