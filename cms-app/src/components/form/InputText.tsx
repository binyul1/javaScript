import React, { type BaseSyntheticEvent } from "react";

export interface IInputTextProps {
  type: React.HTMLInputTypeAttribute, 
  name: string, 
  placeholder?: string | null, 
  className?: string,
  onChange: (e: BaseSyntheticEvent) => void
}
export const InputText = ({type, name, placeholder=null, className='', onChange}: Readonly<IInputTextProps>) => {
  return (
    <input
      className={`w-full border border-gray-200 rounded-md shadow p-2 ${className}`}
      type={type}
      name={name}
      onChange={onChange}
      placeholder={ placeholder ?? `Enter your ${name}...`}
    />
  );
}