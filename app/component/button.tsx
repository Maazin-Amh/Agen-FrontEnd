interface ButtonProps {
  title: string;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, isDisabled = false }) => {
  return (
    <button
      disabled={isDisabled}
      className="w-20 h-9 rounded ml-3  transition-all duration-300 ease-in-out cursor hover:bg-sky-500 border-none bg-violet-500"
    >
      {title}
    </button>
  );
};

export default Button;
