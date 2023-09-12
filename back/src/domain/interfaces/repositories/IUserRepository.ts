import { User } from "@entities";

export abstract class IUserRepository {
  abstract findBy(where: {
    column: string;
    value: any;
  }): Promise<User | undefined>;
  abstract create(user: User): Promise<void>;
}
