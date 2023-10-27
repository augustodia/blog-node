import { Post } from "@entities";
import { UserContext } from "@DTO";

export abstract class IPostRepository {
  abstract getAll(): Promise<Post[]>;
  abstract getByUser(userId: string): Promise<Post[]>;
  abstract findBy(
    where: {
      column: string;
      value: any;
    },
    onlyActive?: boolean
  ): Promise<Post | undefined>;
  abstract findByWithPermission(
    where: {
      column: string;
      value: any;
    },
    context: UserContext,
    onlyActive?: boolean
  ): Promise<Post | undefined>;
  abstract create(user: Post, context: UserContext): Promise<void>;
  abstract update(entity: Post): Promise<void>;
  abstract inactivate(entity: Post): Promise<void>;
  abstract reactivate(entity: Post): Promise<void>;
  abstract delete(entity: Post): Promise<void>;
}
