import { Post } from "@entities";
import { UserContext } from "@DTO";

export abstract class IPostRepository {
  abstract findBy(where: {
    column: string;
    value: any;
  }): Promise<Post | undefined>;
  abstract findByWithPermission(
    where: {
      column: string;
      value: any;
    },
    context: UserContext
  ): Promise<Post | undefined>;
  abstract create(user: Post, context: UserContext): Promise<void>;
  abstract update(entity: Post): Promise<void>;
  abstract inactivate(entity: Post): Promise<void>;
  abstract delete(entity: Post): Promise<void>;
}
