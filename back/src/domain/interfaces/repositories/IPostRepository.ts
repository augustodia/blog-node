import { Post } from "@entities";
import { UserContext } from "@DTO";

export abstract class IPostRepository {
  abstract create(user: Post, context: UserContext): Promise<void>;
}
