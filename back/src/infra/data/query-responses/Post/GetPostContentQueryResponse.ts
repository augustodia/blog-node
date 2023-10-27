import { ContentBlockTypeEnum } from "@entities";

export type GetPostContentQueryResponse = {
  id: string;
  postId: string;
  order: number;
  content: string;
  type: ContentBlockTypeEnum;
  visible: number;
  createdAt: Date;
  updatedAt: Date | null;
};
