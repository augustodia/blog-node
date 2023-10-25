export type FindPostQueryResponse = {
  id: string;
  userId: string;
  title: string;
  published: number;
  createdAt: Date;
  updatedAt: Date | null;
};
