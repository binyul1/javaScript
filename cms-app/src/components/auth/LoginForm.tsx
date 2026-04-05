import { CancelButton, SubmitButton } from "../buttons/Button";
import { FormLabel } from "../form/Label";
import { InputText } from "../form/InputText";
import { RedirectLink } from "../links/Urls";
import { useForm } from "react-hook-form";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface ICredentials {
  username: string;
  password: string;
}

//validation rules
const loginDTO = z.object({
  username: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const LoginForm = () => {
  //using hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginDTO),
  });
  const submitForm = (data: ICredentials) => {
    console.log(data);
  };

  // export const LoginForm = () => {
  //   //using hook form
  //   const {register, handleSubmit} =  useForm<Icredentials>({
  //     defaultValues:{
  //       username:"",
  //       password:""
  //     }
  //   });

  //   const [credentials, setCredentials] = useState<Icredentials>({
  //     username: "",
  //     password: "",
  //   });

  // const handleChange = (e: BaseSyntheticEvent) => {
  //   const { name, value } = e.target;
  //   setCredentials({
  //     ...credentials,
  //     [name]: value,
  //   });
  // };

  // const submitEvent = (e.BaseSynthetic) => {
  //   e.preventDefault()
  //   // validate
  //   console.log(Credentials)
  //   //todo:Api integrate

  // }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-5 w-full"
    >
      <div className="flex w-full items-center ">
        <FormLabel>UserName: </FormLabel>
        <div className="w-full">
          <InputText
            type="email"
            name="username"
            control={control}
            errMsg={errors?.username?.message}
          />
        </div>
      </div>

      <div className="flex w-full items-center">
        <FormLabel>Password: </FormLabel>
        <div className="w-full">
          <InputText
            type="password"
            name="password"
            control={control}
            errMsg={errors?.password?.message}
          />
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
