import { Post } from "@entities";
import { UserContext } from "@DTO";

export abstract class IPostRepository {
  abstract findBy(where: {
    column: string;
    value: any;
  }): Promise<Post | undefined>;
  abstract findByAndUserId(
    where: {
      column: string;
      value: any;
    },
    context: UserContext
  ): Promise<Post | undefined>;
  abstract create(user: Post, context: UserContext): Promise<void>;
  abstract update(entity: Post, context: UserContext): Promise<void>;
}
