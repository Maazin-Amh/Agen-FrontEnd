"use client";

import { Dispatch, SetStateAction } from "react";
import Button from "./button";
import clsx from "clsx";

interface CardMonth {
  bulan: string;
  tanggal: number;
  setTanggal: Dispatch<SetStateAction<any>>;
  setBulan: Dispatch<SetStateAction<any>>;
}

const Card: React.FC<CardMonth> = ({
  bulan,
  tanggal,
  setBulan,
  setTanggal,
}) => {
  return (
    <section>
      <main className="bg-white shadow-lg rounded-xl w-[200px] h-56">
        <div className="flex flex-col justify-between items-center">
          <div className="bg-red-500 w-full flex justify-center items-center rounded-t-xl h-10">
            <span className=" text-white text-center">{bulan}</span>
          </div>
          <div className="">
            <span
              className={clsx("text-black text-9xl text-center", {
                "text-red-500": tanggal === 17 && bulan === "Agustus",
              })}
            >
              {tanggal}
            </span>
          </div>
          <Button
            title="Clear"
            colorSchema="red"
            variant="outline"
            onClick={() => {
              setTanggal(0);
              setBulan("Agustus");
            }}
          />
        </div>
      </main>
    </section>
  );
};

export default Card;
