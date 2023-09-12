export type FindUserQueryResponse = {
  id: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
};
