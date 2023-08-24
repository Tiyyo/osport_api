import * as z from 'zod';

const loginSchema = z.object({
  username: z.string().min(3, { message: 'Must be at least 4 characters long' }).max(36),
  password: z.string().optional(),
});

export default loginSchema;
