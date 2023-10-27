import { injectable } from "inversify";
import { ContentBlock, Post, PostAuthor } from "@entities";
import { IPostRepository, IPostService } from "@interfaces";
import {
  PostCreateDto,
  PostDto,
  PostTeaserDto,
  PostUpdateDto,
  UserContext,
} from "@DTO";
import EntityNotFound from "../../@shared/errors/EntityNotFound";

@injectable()
export default class PostService implements IPostService {
  constructor(private repository: IPostRepository) {}

  async getAll(): Promise<PostTeaserDto[]> {
    const posts = await this.repository.getAll();

    return posts.map((post) => post.toTeaserDto());
  }

  async getById(id: string): Promise<PostDto> {
    const post = await this.repository.findBy({ column: "id", value: id });

    if (!post) throw new EntityNotFound("post");

    return post.toDto();
  }

  async getByUser(userId: string): Promise<PostTeaserDto[]> {
    const posts = await this.repository.getByUser(userId);

    return posts.map((post) => post.toTeaserDto());
  }

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
      author: new PostAuthor({ id: context.userId, userName: "" }),
      published: dto.published,
      contentBlocks,
    });

    await this.repository.create(postToCreate, context);
  }

  async update(
    id: string,
    dto: PostUpdateDto,
    context: UserContext
  ): Promise<void> {
    const postToUpdate = await this.repository.findByWithPermission(
      {
        column: "id",
        value: id,
      },
      context
    );

    if (!postToUpdate) throw new EntityNotFound("Post");

    postToUpdate.update({
      title: dto.title,
      published: dto.published,
      author: new PostAuthor({ id: context.userId, userName: "" }),
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

    await this.repository.update(postToUpdate);
  }

  async inactivate(id: string, context: UserContext): Promise<void> {
    const postToInactivete = await this.repository.findByWithPermission(
      {
        column: "id",
        value: id,
      },
      context
    );

    if (!postToInactivete) throw new EntityNotFound("Post");

    await this.repository.inactivate(postToInactivete);
  }

  async reactivate(id: string, context: UserContext): Promise<void> {
    const postToActivate = await this.repository.findByWithPermission(
      {
        column: "id",
        value: id,
      },
      context,
      false
    );

    if (!postToActivate) throw new EntityNotFound("Post");

    await this.repository.reactivate(postToActivate);
  }

  async delete(id: string, context: UserContext): Promise<void> {
    const postToDelete = await this.repository.findByWithPermission(
      {
        column: "id",
        value: id,
      },
      context,
      false
    );

    if (!postToDelete) throw new EntityNotFound("Post");

    await this.repository.delete(postToDelete);
  }
}
