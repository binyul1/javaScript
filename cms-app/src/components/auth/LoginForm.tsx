import { useState, type BaseSyntheticEvent } from "react";
import { InputText } from "../../components/page-title/form/InputText";

export interface Icredentials {
  username: string;
  password: string;
}

export const LoginDesc = () => {
  const [credentials, setCredentials] = useState<Icredentials>({
    username: "",
    password: "",
  });

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  console.log(credentials);
  return (
    <form className="flex flex-col justify-center items-center">
      <div className="flex gap-4 mb-4 items-center">
        <label className="items-center">UserName</label>
        <InputText type="username" name="username" onChange={handleChange} />
      </div>
      <div className="flex gap-4 mb-4 items-center">
        <label className="">Password</label>
        <InputText type="password" name="password" onChange={handleChange} />
      </div>
      <a
        href="/forget_password"
        className="flex w-full justify-end underline text-teal-700 italic hover:text-teal-t00/60"
      >
        Forgot Password?
      </a>
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 "
        >
          Login
        </button>
        <button
          type="reset"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 w-[50%]"
        >
          Reset
        </button>
      </div>
    </form>
  );
};
