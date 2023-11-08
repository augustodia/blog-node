import z from 'zod';

const UserSchema = z.object({
    id: z.string(),
    userName: z.string(),
})

type UserDto = z.infer<typeof UserSchema>;

export {UserSchema, UserDto}