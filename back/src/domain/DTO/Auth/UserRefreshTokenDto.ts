import z from "zod";

export const UserRefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type UserRefreshTokenDto = z.infer<typeof UserRefreshTokenSchema>;
