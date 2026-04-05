import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

export interface IInputTextProps<T extends FieldValues> {
  type: React.HTMLInputTypeAttribute;
  name: Path<T>;
  placeholder?: string | null;
  className?: string;
  // onChange: (e: BaseSyntheticEvent) => void
  control: Control<T>;
  errMsg?: string | null;
}
export const InputText = <T extends FieldValues>({
  type,
  name,
  placeholder = null,
  className = "",
  control,
  errMsg = "",
}: Readonly<IInputTextProps<T>>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <>
            <input
              className={`w-full border border-gray-200 rounded-md shadow p-2 ${className}`}
              type={type}
              {...field}
              placeholder={placeholder ?? `Enter your ${name}...`}
            />
            <span className=" text-red-700 italic text-sm">{errMsg}</span>
          </>
        );
      }}
    />
  );
};
