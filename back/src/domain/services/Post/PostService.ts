import { injectable } from "inversify";
import { ContentBlock, Post } from "@entities";
import { IPostRepository, IPostService } from "@interfaces";
import { PostCreateDto, PostUpdateDto, UserContext } from "@DTO";
import EntityNotFound from "../../@shared/errors/EntityNotFound";

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

  async update(
    idSync: string,
    dto: PostUpdateDto,
    context: UserContext
  ): Promise<void> {
    const postToUpdate = await this.repository.findByAndUserId(
      {
        column: "id",
        value: idSync,
      },
      context
    );

    if (!postToUpdate) throw new EntityNotFound("Post");

    postToUpdate.update({
      title: dto.title,
      published: dto.published,
      contentBlocks: dto.contentBlocks?.map(
        (contentBlockDto) =>
          new ContentBlock({
            id: contentBlockDto.id,
            value: contentBlockDto.value,
            order: contentBlockDto.order,
            type: contentBlockDto.type,
            visible: contentBlockDto.visible,
          })
      ),
    });

    await this.repository.update(postToUpdate, context);
  }
}
