import { z } from 'zod';

const LoginSchema = z.object({
  username: z.string().nonempty().nonoptional(),
  password: z.string().nonempty().nonoptional(),
});

export default LoginSchema;