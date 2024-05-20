import React from "react";
import clsx from "clsx";
import CurrencyInput from "react-currency-input-field";
import { getIn } from "formik";

interface CurrencyInputProps {
  id: undefined | string;
  name: string;
  value: string | number | undefined;
  messageError?: string;
  error?: any;
  touched?: any;
  perfix?: string;
  onValueChange: (value: string | number | undefined) => void;
}

const CurrencyInputs: React.FC<CurrencyInputProps> = ({
  id,
  name,
  value,
  messageError = "wajib di isi",
  error,
  touched,
  perfix,
  onValueChange,
  ...props
}) => {
  return (
   
    <section>
         <CurrencyInput
      id={id}
      name={name}
      value={value}
      decimalsLimit={2}
      prefix={perfix}
      decimalSeparator=","
      groupSeparator="."
      
      onValueChange={(value) => {
        onValueChange(value);
      }}
      className={clsx(
        "w-full py-2 pl-4 block border border-gray-700 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500",
        {
          "focus:ring-red-500 border-2 border-red-500": error && touched,
          "focus:ring-red-500 border-black": touched && !error,
        }
      )}
      {...props}
    />
         {error ? (
        <p className="text-red-500 font-bold">{messageError}</p>
      ) : (
        <></>
      )}
    </section>
    
  );
};

export default CurrencyInputs;
