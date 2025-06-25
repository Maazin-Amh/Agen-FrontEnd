"use client";
import useAuthModule from "@/app/auth/lib";
import { dateUtil } from "@/utils";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const { useProfile } = useAuthModule();
  const { data: profile, isLoading } = useProfile();
  const router = useRouter();

  if (isLoading || !profile?.data) {
    return (
      <p className="text-center p-6 text-gray-500">Memuat data profil...</p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white border-black border-2 rounded-xl p-6 w-full max-w-md text-center">
        <div className="flex">
          <button onClick={() => router.back()} className=" items-start flex">
            <FaArrowLeft />
          </button>
          <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-green-500 from-10%  to-emerald-500 to-90% text-white flex items-center justify-center text-4xl mb-4">
            <i className="fas fa-user"></i>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {profile.data.nama}
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          <i className="fas fa-envelope text-black-600"></i>
          {profile.data.email}
        </p>

        <div className="bg-gray-50 p-4 rounded-md border text-sm text-left space-y-3">
          <p className="text-gray-700">
            <i className="fas fa-map-marker-alt text-black-600 "></i>
            {profile.data.alamat}
          </p>
          <p className="text-gray-600">
            <i className="fas fa-calendar-alt text-black-600"></i>
            Gabung: {dateUtil.formatDateIndLong(profile.data.created_at)}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/dashboard/customer/profile/edit`)}
            className="mt-6 border border-black hover:bg-green-700 hover:text-white w-full p-2 rounded"
          >
            <i className="fas fa-edit"></i> Edit Alamat
          </button>
          <button
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/login");
              });
            }}
            className="mt-6 bg-red-700 text-white w-full p-2 rounded"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
