import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  return (
    <header className="w-full bg-white sticky py-4 px-6 shadow flex items-center gap-5">
      <button onClick={() => router.back()} className="">
        <FaArrowLeft />
      </button>
      <h1 className="text-2xl font-bold text-green-800 cursor-pointer">Agen Store Bekasi</h1>
    </header>
  );
}
