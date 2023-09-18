"use client";
import { useRef, useState } from "react";
import Button from "../../component/button";
import { useClosure } from "@/hook";

const Home = () => {
  const { isOpen, onOpen, onClose } = useClosure();

  return (
    <section className="h-screen w-screen space-y-5">
      <Button
        onClick={onOpen}
        colorSchema="blue"
        variant="solid"
        title="open"
      />
      <Button
        onClick={onClose}
        colorSchema="red"
        variant="solid"
        title="closed"
      />

      {isOpen ? <p>Open</p> : <p>Close</p>}
    </section>
  );
};

export default Home;
