import Button from "@/components/Button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-7 h-screen">
      <div className=" border-r-[1px] p-2 border-gray-400">
      <Button
          title="produk"
          colorSchema="dark"
        //   onClick={() => {
        //     router.push("admin/produk");
        //   }}
        />
      </div>
      <div className="col-span-6">{children}</div>
    </div>
  );
}
