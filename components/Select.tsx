import clsx from "clsx";
import { ChangeEvent } from "react";
// import { motion } from "framer-motion";

type Variant = "solid" | "outline";
type ColorSchema = "blue" | "red" | "green";

interface ButtonProps {
  options: { value: string | number; label: string }[];
  name: string;
  isError?: boolean;
  messageError?: string;
  id: string;
  value: string | number | null | undefined;
}

const Select: React.FC<
  ButtonProps & React.SelectHTMLAttributes<HTMLSelectElement>
> = ({
  options,
  value,
  name,
  id,
  messageError = "wajib di isi",
  isError = false,
  ...props
}) => {
  return (
    <section className="relative">
      <svg
        className="w-2 text-gray-400 overflow-visible absolute h-full right-3 group-hover:text-gray-600"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 2L10.6464 7.64645C10.8417 7.84171 10.8417 8.15829 10.6464 8.35355L5 14"
          stroke="currentColor"
          stroke-width="4"
          transform="rotate(90)"
          stroke-linecap="round"
        ></path>
      </svg>
      <select
        value={value}
        name={name}
        id={id}
        className={clsx(
          `py-2 px-3 pr-9 block border appearance-none w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500`,
          {
            "border-red-500 border-2": isError,
            "border-gray-700": !isError,
          }
        )}
        {...props}
      >
        <option>Pilih</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isError ? (
        <p className="text-red-500 font-bold">{messageError}</p>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Select;
