"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import useAuthModule from "../auth/lib";

const Admin = () => {
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(profile)
  return (
    <div>
      Admin
      {JSON.stringify(session)}
      <br />
      {JSON.stringify(profile)}
      {status}
      <Button
        title="Logout"
        colorSchema="red"
        onClick={() => {
          signOut({ redirect: false }).then(() => {
            router.push("/login");
          });
        }}
      />
    </div>
  );
};

export default Admin;
