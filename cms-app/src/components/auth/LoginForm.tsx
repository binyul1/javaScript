import { CancelButton, SubmitButton } from "../buttons/Button";
import { FormLabel } from "../form/Label";
import { InputText } from "../form/InputText";
import { RedirectLink } from "../links/Urls";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  loginDTO,
  type ICredentials,
} from "../../types/auth-type";
import { useAuth } from "../../lib/hook/auth-hook";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  //using hook form
  const {control,handleSubmit, formState: { errors, isSubmitting }} = useForm<ICredentials>({defaultValues: {username: "",
      password: "",
    },
    resolver: zodResolver(loginDTO),
  });

  const submitForm = async (data: ICredentials) => {
    try {
      const userDetail =  await login(data);
      if(userDetail){

        navigate("/"+userDetail?.role);
      }else{
        throw{message:"Error Logging in"}
      } 
    } catch (exception: unknown) {
      toast.error("Invalid or Wrong Credentials");
      console.log(exception);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col gap-5 w-full"
    >
      <div className="flex w-full items-center ">
        <FormLabel>UserName: </FormLabel>
        <div className="w-full">
          <InputText
            type="text"
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
        <CancelButton disabled={isSubmitting}>Reset</CancelButton>
        <SubmitButton className="text-white bg-teal-800 hover:bg-teal-800/90" disabled={isSubmitting}>
          Login
        </SubmitButton>
      </div>
    </form>
  );
};
