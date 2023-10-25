import { PostCreateDto, UserContext } from "@DTO";

export abstract class IPostService {
  abstract create(dto: PostCreateDto, context: UserContext): Promise<void>;
}
