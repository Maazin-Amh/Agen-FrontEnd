interface LabelProps {
    htmlFor: string;
    isRequired?: boolean;
    title:string
  }
  
  const Label: React.FC<LabelProps> = ({ htmlFor, title, isRequired=false }) => {
    return (
      <label htmlFor={htmlFor} className="w-16 h-8 text-sm capitalize text-gray-600">
        {title} {isRequired ? <span className="text-red-500">*</span> : <></>}
      </label>
    );
  };
  
  export default Label;
  