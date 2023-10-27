import { PostAuthorDto } from "./";

export type PostTeaserDto = {
  id: string;
  title: string;
  createdAt: Date;
  author: PostAuthorDto;
  contentTeaser: string;
};
