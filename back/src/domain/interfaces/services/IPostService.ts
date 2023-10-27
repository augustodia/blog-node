import {
  PostCreateDto,
  UserContext,
  PostUpdateDto,
  PostTeaserDto,
  PostDto,
} from "@DTO";

export abstract class IPostService {
  abstract getAll(): Promise<PostTeaserDto[]>;
  abstract getById(id: string): Promise<PostDto>;
  abstract getByUser(id: string): Promise<PostTeaserDto[]>;
  abstract create(dto: PostCreateDto, context: UserContext): Promise<void>;
  abstract update(
    id: string,
    dto: PostUpdateDto,
    context: UserContext
  ): Promise<void>;
  abstract inactivate(id: string, context: UserContext): Promise<void>;
  abstract reactivate(id: string, context: UserContext): Promise<void>;
  abstract delete(id: string, context: UserContext): Promise<void>;
}
