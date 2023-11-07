import z from 'zod';
import {AuthorSchema} from "@/services/dto/post/Author";


const PostTeaserSchema = z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.string(),
    author: AuthorSchema,
    contentTeaser: z.string(),
});

type PostTeaserDto = z.infer<typeof PostTeaserSchema>;

export {PostTeaserSchema, PostTeaserDto}