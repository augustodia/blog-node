import { ContentBlockTypeEnum } from "@entities";

export type ContentBlockDto = {
  id: string;
  value: string;
  order: number;
  type: ContentBlockTypeEnum;
};
