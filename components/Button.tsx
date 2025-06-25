import clsx from "clsx";
import ClipLoader from "react-spinners/ClipLoader";

type Variant = "solid" | "outline";
type ColorSchema = "blue" | "red" | "green" | "dark" | "teal";

interface ButtonProps {
  title: string;
  isDisabled?: boolean;
  variant?: Variant;
  colorSchema?: ColorSchema;
  width?: string;
  height?: string;
  isLoading?: boolean;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  title,
  isDisabled = false,
  variant = "solid",
  colorSchema,
  width = "full",
  height = "md",
  isLoading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={clsx(` rounded w-24  capitalize`, {
        "bg-blue-500 text-white": colorSchema === "blue" && variant === "solid",
        "border-blue-500 border text-blue-500":
          colorSchema === "blue" && variant === "outline",
        "bg-red-500 text-white": colorSchema === "red" && variant === "solid",
        "bg-slate-900 text-white":
          colorSchema === "dark" && variant === "solid",
        "bg-teal-500 text-white": colorSchema === "teal" && variant === "solid",
        "border-red-500 text-red-500 ":
          colorSchema === "red" && variant === "outline",
        "bg-green-800 text-white":
          colorSchema === "green" && variant === "solid",
        "border-green-800 text-green-800":
          colorSchema === "green" && variant === "outline",
        "opacity-25": isDisabled,
        "w-24": width === "md",
        "w-8": width === "sm",
        "w-full py-[0.45rem] rounded-full": width === "lg",
        "w-full py-[0.45rem] rounded-lg": width === "lg1",
        "w-full": width === "full",
        "h-8": width === "sm",
        "w-24 py-1 rounded-full": width === "gap",
        "w-32 py-2 rounded-lg": width === "filter",
        "h-12": width === "md",
        "w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border-[1px]":
          width === "login",
      })}
    >
      {isLoading ? (
        <ClipLoader
          color={"#36d7b7"}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
