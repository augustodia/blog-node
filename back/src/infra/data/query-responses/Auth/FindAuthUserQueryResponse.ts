export type FindAuthUserQueryResponse = {
  id: string;
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
};
