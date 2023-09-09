"use client"; // gunakan use client karena ada onChange pda komponen
import { useState } from "react";
import BelajarState from "./component/belajarstate";
import Card from "./component/card";
import Button from "./component/button";
import InputText from "./component/InputText";
import React from "react";

export type Identitas = {
  nama: string;
  sekolah: string;
  umur: number | null;
};

export type Hasil = {
  mata_pelajaran: string;
  nilai: number | null;
};

let Home = () => {
  let [tanggal, setTanggal] = useState(0);
  let [bulan, setBulan] = useState("Agustus");

  return (
    <main className="space-y-5 m-5">
      <h1>Latihan</h1>
      <Card
        bulan={bulan}
        tanggal={tanggal}
        setTanggal={setTanggal}
        setBulan={setBulan}
      />
      <Button
        onClick={() => {
          setTanggal((c) => c + 1);
        }}
        colorSchema="blue"
        isDisabled={tanggal > 30}
        variant="solid"
        title="tambah"
      />
      <Button
        onClick={() => {
          setTanggal((c) => c - 1);
        }}
        isDisabled={tanggal < 1}
        colorSchema="red"
        variant="solid"
        title="kurang"
      />
      {/* <InputText
        id="bulan"
        name={"bulan"}
        value={bulan}
        onChange={(e) => {
          setBulan(e.target.value);
        }}
      /> */}

      
      <section className="relative top-0 left-0 right-0 bottom-0">
        <select
          name={"bulan"}
          id="bulan"
          className="py-2 px-4 pr-9 w-full block appearance-none rounded-md text-sm border-2 outline-none border-sky-500"
          value={bulan}
          onChange={(e) => {
            setBulan(e.target.value);
          }}
        >
          <option value="Januari">Januari</option>
          <option value="Februari">Februari</option>
          <option value="Maret">Maret</option>
          <option value="April">April</option>
          <option value="Mei">Mei</option>
          <option value="Juni">Juni</option>
          <option value="Juli">Juli</option>
          <option value="Agustus">Agustus</option>
          <option value="September">September</option>
          <option value="Okteber">Okteber</option>
          <option value="November">November</option>
          <option value="Desember">Desember</option>
        </select>
        <div className="pointer-events-none absolute right-0 bottom-0 top-0 flex items-center px-4 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.293a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L10 10.586 4.707 5.293a1 1 0 00-1.414 1.414l5 5z" />
          </svg>
        </div>
      </section>

      <Button
        onClick={() => {
          alert("🥳 Hut Republik Indonesia 🥳");
        }}
        isDisabled={tanggal !== 17 || bulan !== "Agustus"}
        colorSchema="rose"
        variant="outline"
        title="Event"
      />
    </main>
  );
};

export default Home;
