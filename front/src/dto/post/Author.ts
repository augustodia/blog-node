import z from 'zod';

const AuthorSchema = z.object({
    id: z.string(),
    userName: z.string(),
})

type AuthorDto = z.infer<typeof AuthorSchema>;

export {AuthorSchema, AuthorDto}