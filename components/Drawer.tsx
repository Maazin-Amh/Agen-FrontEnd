"use client";
import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import Button from "./Button";
import { useSpring, animated, Any } from "@react-spring/web";

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  onClear: () => void;
  onClose: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  title,
  children,
  onSubmit,
  onClear,
  onClose,
}) => {
  const springs = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? "translateX(0%)" : "translateX(100%)",
    },
  });

  return (
    <animated.div
      style={{
        ...(!isOpen && {}),
        ...springs,
      }}
      className={
        "md:w-[50%] fixed top-0 custom right-0 bottom-0 lg:w-[30%] xl:w-[21%] m-5 rounded-xl w-full drop-shadow-lg bg-white shadow-lg px-5"
      }
    >
      <section className="h-[5%] pt-5">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => {
              onClear();
              console.log('keklok', onClear)
            }}
            title="Clear"
            width="gap"
            colorSchema="dark"
          />
           <Button
            onClick={() => {
              onClose();
            }}
            title="Close"
            width="gap"
            colorSchema="dark"
          />
        </div>
        <h5 className="text-gray-700 mt-4 text-lg font-semibold">{title}</h5>
      </section>
      <section className="h-[90%] py-10">{children}</section>
      <section className="absolute flex justify-center right-0 left-0 bottom-4 px-5">
        <Button
          onClick={() => {
            onSubmit();
            onClose();
          }}
          title="Terapkan"
          colorSchema="dark"
          width={"lg"}
        />
      </section>
    </animated.div>
  );
};
