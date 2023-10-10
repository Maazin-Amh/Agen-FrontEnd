"use client"; 
import { useState } from "react";
import Button from "@/components/Button";

const Home = () => {
  let [message, setMessage] = useState("hai"); 
  let [count, setCount] = useState(0); 

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
