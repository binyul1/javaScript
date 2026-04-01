import type React from "react";

interface IInputTextProps {
    type: string;
    name: string;
}
//"Reactnode" is a type that represents any valid React element, including JSX elements, strings, numbers, etc. It is used to define the type of the children prop in React components.
//"ReactElement" is a type that represents a React element created using JSX. It is used to define the type of the return value of a React component.
//"HRMLInputTypeAttribute" is a type that represents the valid values for the "type" attribute of an HTML input element. It includes values like "text", "password", "email", etc.

export const InputText = ({
    type, 
    name}: Readonly<IInputTextProps> ) => {
  return (
  <input
          type={type}
          name={name}
          className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500"
          placeholder={`Enter your ${name}`}
        />
    
  );
};