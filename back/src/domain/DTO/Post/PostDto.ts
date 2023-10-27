import { ContentBlockDto, PostAuthorDto } from "./";

export type PostDto = {
  id: string;
  title: string;
  createdAt: Date;
  author: PostAuthorDto;
  contentBlocks: Array<ContentBlockDto | undefined>;
};
