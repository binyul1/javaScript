import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().nonempty().nonoptional(),
  password: z.string().nonempty().nonoptional(),
});

export const UserRegisterScema = z.object({
  firstName : z.string().min(2).max(20).nonempty("First Name is required"),
  maidenName : z.string().nullable(),
  LastName : z.string().min(2).max(20).nonempty("Last Name is required"),
  email: z.email().nonempty("Email is required"),
  username: z.string().min(3).max(25).nonempty("username is required"),
  password : z. string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\\0-9])(?=.8[\W-_]).{8-25}$/,"Password does not follow strong password rule"),
  confirmPassword : z.string().nonempty(),
  phone : z.string().nullable()

}).refine((data)=> data.password === data.confirmPassword,
{
  message:"Password and confirm password doesnot match",
  path:['confirmPassword']
})

