import z from "zod";
import { ContentBlockTypeEnum } from "@entities";

export const PostUpdateSchema = z.object({
  title: z.string(),
  published: z.boolean(),
  contentBlocks: z.array(
    z.object({
      id: z.string().optional(),
      value: z.string(),
      visible: z.boolean(),
      order: z.number(),
      type: z.nativeEnum(ContentBlockTypeEnum),
    })
  ),
});

export type PostUpdateDto = z.infer<typeof PostUpdateSchema>;
