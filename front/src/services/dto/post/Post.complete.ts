import z from 'zod';
import {AuthorSchema} from "@/services/dto/post/Author";
import {ContentBlockSchema} from "@/services/dto/post/ContentBlock";


const PostCompleteSchema = z.object({
    id: z.string(),
    title: z.string(),
    createdAt: z.string(),
    author: AuthorSchema,
    contentBlocks: z.array(ContentBlockSchema),
});

type PostCompleteDto = z.infer<typeof PostCompleteSchema>;

export {PostCompleteSchema, PostCompleteDto}