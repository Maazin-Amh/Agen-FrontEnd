interface LabelProps {
  htmlFor: string;
  isRequired?: boolean;
  title: string;
}

const Label: React.FC<
  LabelProps & React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ htmlFor, title, isRequired = false }) => {
  return (
    <label htmlFor={htmlFor}>
      {title}
      {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
