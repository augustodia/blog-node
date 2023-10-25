import { injectable } from "inversify";
import { ContentBlock, Post } from "@entities";
import { IPostRepository, IPostService } from "@interfaces";
import { PostCreateDto, UserContext } from "@DTO";

@injectable()
export default class PostService implements IPostService {
  constructor(private repository: IPostRepository) {}

  async create(dto: PostCreateDto, context: UserContext) {
    const contentBlocks = dto.contentBlocks?.map(
      (contentDto) =>
        new ContentBlock({
          value: contentDto.value,
          order: contentDto.order,
          type: contentDto.type,
          visible: contentDto.visible,
        })
    );

    const postToCreate = new Post({
      title: dto.title,
      published: dto.published,
      contentBlocks,
    });

    await this.repository.create(postToCreate, context);
  }
}
