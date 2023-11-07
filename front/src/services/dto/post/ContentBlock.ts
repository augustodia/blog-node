import z from 'zod';

export enum ContentBlockTypeEnum {
    Text = "text",
}

const ContentBlockSchema = z.object({
    id: z.string(),
    value: z.string(),
    order: z.number(),
    type: z.nativeEnum(ContentBlockTypeEnum),
});

type ContentBlockDto = z.infer<typeof ContentBlockSchema>;

export {
    ContentBlockSchema,
    ContentBlockDto
}
