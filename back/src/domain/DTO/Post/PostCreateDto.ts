import z from "zod";
import { ContentBlockEnum } from "@entities";

export const PostCreateSchema = z.object({
  title: z.string(),
  published: z.boolean(),
  contentBlocks: z
    .array(
      z.object({
        value: z.string(),
        visible: z.boolean(),
        order: z.number(),
        type: z.nativeEnum(ContentBlockEnum),
      })
    )
    .optional(),
});

export type PostCreateDto = z.infer<typeof PostCreateSchema>;
