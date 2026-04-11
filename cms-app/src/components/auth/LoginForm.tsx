import { CancelButton, SubmitButton } from "../buttons/Button";
import { FormLabel } from "../form/Label";
import { InputText } from "../form/InputText";
import { RedirectLink } from "../links/Urls";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import {
  loginDTO,
  type ICredentials,
  type ILoginResponse,
  type IUserDetail,
} from "../../types/auth-type";
import axiosInstance from "../../config/apiClient";

export const LoginForm = () => {
  const navigate = useNavigate();
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
  const submitForm = async (data: ICredentials) => {
    try {
      // XMLHttpRequest
      const loginResponse = (await axiosInstance.post(
        "auth/login",
        data,
      )) as ILoginResponse;
      Cookies.set("_at_62", loginResponse.accessToken, {
        expires: 1,
        secure: true,
        sameSite: "lax",
      });
      Cookies.set("_rt_62", loginResponse.refreshToken, {
        expires: 1,
        secure: true,
        sameSite: "lax",
      });

      const userDetail = (await axiosInstance.get("/auth/me")) as IUserDetail;
      // redirect
      navigate("/" + userDetail?.role);
      console.log(loginResponse);
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
        <CancelButton>Reset</CancelButton>
        <SubmitButton className="text-white bg-teal-800 hover:bg-teal-800/90">
          Login
        </SubmitButton>
      </div>
    </form>
  );
};
