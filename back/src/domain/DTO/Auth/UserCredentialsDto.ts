import z from "zod";

export const UserCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UserCredentialsDto = z.infer<typeof UserCredentialsSchema>;
