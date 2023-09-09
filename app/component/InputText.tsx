import { clsx } from "clsx";

interface InputProps {
  isError?: boolean;
  messageError?: string;
  messageBerhasil?: string;
  value?: string;
  id: number | string;
  name?: string;
}

const InputText: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  messageError = "isi terlebih dahulu",
  isError = false,
  value,
  id,
  name,
  ...props
}) => {
  return (
    <section>
      <input
        value={value}
        id={id}
        name={name}
        className={clsx("w-full h-8 border focus:ring-purple-500 focus:ring-1 outline-none rounded px-2", {
          " border-green-700": isError === false,
          "border-red-500 border-2": isError === true,
        })}
        {...props}
      />
      {/* {isError === true ? (
        <p className="text-red-500 text-sm">{messageError}</p>
      ) : (
        <p className="text-green-500 text-sm">{messageBerhasil}</p>
      )} */}
    </section>
  );
};

export default InputText;