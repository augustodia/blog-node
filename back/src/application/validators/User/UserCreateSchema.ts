import z from "zod";

export const UserCreateSchema = z.object({
  email: z.string(),
  userName: z.string(),
  password: z.string(),
});

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
