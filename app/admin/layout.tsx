"use client";
import Button from "@/components/Button";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const list = [
    {
      label: "Admin",
      url: "/admin",
    },
    {
      label: "Profile",
      url: "/profile",
    },
    {
      label: "Kategori",
      url: "/kategori",
    },
    {
      label: "Produk",
      url: "/admin/produk",
    },
    {
      label: "Konsumen",
      url: "/konsumen",
    },
  ];
  return (
    <div className="grid grid-cols-7 h-screen">
      <div className=" border-r-[1px]  border-gray-400">
        {pathname}
        {list.map((item, index) => (
          <section key={index} className="p-3">
            <button
              className={clsx("w-32 py-2 rounded-lg", {
                "bg-slate-900 text-white":
                  pathname?.includes(item.url) === true ,
                "bg-white text-slate-900 border border-slate-900":
                  pathname?.includes(item.url) === false,
              })}
              onClick={() => {
                router.push(item.url);
              }}
            >
              {item.label}
            </button>
          </section>
        ))}
      </div>
      <div className="col-span-6">{children}</div>
    </div>
  );
}
