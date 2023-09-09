"use client";
import { count } from "console";
import Button from "./button";
import React, { Dispatch, SetStateAction } from "react";

interface TmbahProps {
  count: number;
  setCount: Dispatch<SetStateAction<any>>;
}

const Tambah: React.FC<TmbahProps> = ({ count, setCount }) => {
  return (
    <section>
      <h1>{count}</h1>
      <Button
        colorSchema="blue"
        variant="solid"
        title="tambah"
        onClick={() => {
            setCount((c: number) => c + 1)
        }}
      />
    </section>
  );
};
export default Tambah;
