import { PostCreateDto, UserContext, PostUpdateDto } from "@DTO";

export abstract class IPostService {
  abstract create(dto: PostCreateDto, context: UserContext): Promise<void>;
  abstract update(
    idSync: string,
    dto: PostUpdateDto,
    context: UserContext
  ): Promise<void>;
  abstract inactivate(idSync: string, context: UserContext): Promise<void>;
  abstract reactivate(idSync: string, context: UserContext): Promise<void>;
  abstract delete(idSync: string, context: UserContext): Promise<void>;
}
