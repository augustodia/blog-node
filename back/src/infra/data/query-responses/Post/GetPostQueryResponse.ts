export type GetPostQueryResponse = {
  id: string;
  title: string;
  published: number;
  createdAt: Date;
  updatedAt: Date | null;
  authorId: string;
  authorUserName: string;
};
