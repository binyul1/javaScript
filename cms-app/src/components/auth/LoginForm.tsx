import { useState, type BaseSyntheticEvent } from "react";
import { CancelButton, SubmitButton } from "../buttons/Button";
import { FormLabel } from "../form/Label";
import { InputText } from "../form/InputText";
import { RedirectLink } from "../links/Urls";

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
    <form className="flex flex-col gap-5 w-full">
      <div className="flex w-full items-center ">
        <FormLabel>UserName: </FormLabel>
        <div className="w-full">
          <InputText type="email" name="username" onChange={handleChange} />
        </div>
      </div>

      <div className="flex w-full items-center">
        <FormLabel>Password: </FormLabel>
        <div className="w-full">
          <InputText type="password" name="password" onChange={handleChange} />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <RedirectLink href="/forget_password">
          Forget Your Password?
        </RedirectLink>
      </div>
      <div className="flex w-full gap-3">
        <CancelButton>Reset</CancelButton>
        <SubmitButton className="text-white bg-teal-800 hover:bg-teal-800/90">
          Login
        </SubmitButton>
      </div>
    </form>
  );
};
