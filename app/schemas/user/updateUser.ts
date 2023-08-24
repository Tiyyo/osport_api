import * as z from 'zod';

const updateUserSchema = z.object({
  email: z.string().email({ message: 'This is not an valid email' }).optional(),
  username: z.string().min(3, { message: 'Must be at least 4 characters long' }).max(36).optional(),
  password: z.string().optional(),
});

export default updateUserSchema;
