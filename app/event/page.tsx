"use client"; // gunakan use client karena ada onChange pda komponen
import { useState } from "react";
import Button from "../component/button";

const Home = () => {
  let [message, setMessage] = useState("hai"); // jika string, dengan data awal "hai"
  let [count, setCount] = useState(0); // jika number , dengan data awal 0

  const increment = () => {
    setCount((c) => c + 1);
  };

  const decrement = () => {
    setCount((c) => c - 1);
  };

  return (
    <main className="space-y-5">
      <h1>Hello World</h1>
      <p>message addalah {message}</p>{" "}
      <Button
        title="Hello"
        variant="solid"
        colorSchema="blue"
        onClick={() => {
          setMessage("Hello");
        }}
      />
      <div>{count}</div>
      <Button
        title="Tambah"
        variant="solid"
        colorSchema="blue"
        onClick={increment}
      />
      <Button
        title="Kurang"
        variant="solid"
        colorSchema="red"
        onClick={decrement}
      />
    </main>
  );
};

export default Home;
