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
  // username: z.email("Invalid email").nonempty("email is required"),
  username: z.string("Invalid string").nonempty("username is required"),
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
  const submitForm = async (data: ICredentials) => {
    // console.log(data);
    // //after login
    // //BE will send us a token -> auth token/JWT token
    // //header.payload.signature
    // const response = {
    //   token:
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    // };
    // // cookie set
    // Cookies.set("authToken", response.token, {
    //   // expires: 7,
    //   secure: true,
    //   sameSite: "lax",
    //   // domain: "",
    //   // path: ""
    // }
    try {
      const response = await fetch(`http://dummyjson.com/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const loginResponse = await response.json();
      console.log(loginResponse);
    } catch (exception) {
      console.log(exception);
    }
  };
  //   // localstorage set
  //   localStorage.setItem("authToken", response.token);
  //   sessionStorage.setItem("authToken", response.token);
  //   caching (Redis)
  //   firebase storage

  //   // logout function
  //   Cookies.remove("authToken",{
  //     // path:"/"
  //   });
  //   localStorage.removeItem("authToken");
  //   sessionStorage.removeItem("authToken");
  // };

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

  // const submitEvent = (e:BaseSynthetic) => {
  //   e.preventDefault()
  //   // validate
  //   if(!Credentials.username && ){}
  //   console.log(Credentials)
  //   //todo:Api integrate
  //   }

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
