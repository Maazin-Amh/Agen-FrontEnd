"use client";
import { useRef, useState } from "react";
import Button from "../../component/button";


const Home = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <section className="h-screen w-screen space-y-5">
     <Button onClick={onOpen} colorSchema="blue" variant="solid" title="open" />
     <Button onClick={onClose} colorSchema="red" variant="solid" title="closed" />


     {isOpen ? <p>Open</p> : <p>Close</p>}

    </section>
  );
};

export default Home;
