import { injectable } from "inversify";
import BaseRepository from "@infra/data/repositories/BaseRepository";
import { IPostRepository } from "@interfaces";
import { ContentBlock, Post } from "@entities";
import { UserContext } from "@DTO";
import { Knex } from "knex";

@injectable()
export class PostRepository extends BaseRepository implements IPostRepository {
  async create(entity: Post, context: UserContext) {
    const transaction = await this.connection.transaction();
    try {
      const postId = await this.insertPost(entity, context, transaction);

      if (entity.contentBlocks?.length > 0)
        await Promise.all(
          entity.contentBlocks.map((content) =>
            this.insertContentBlock(postId, content, transaction)
          )
        );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  private async insertPost(
    entity: Post,
    context: UserContext,
    transaction: Knex.Transaction
  ) {
    await this.connection("post")
      .insert({
        id: entity.id,
        title: entity.title,
        published: entity.published,
        user_id: context.userId,
      })
      .transacting(transaction);

    return entity.id;
  }

  private async insertContentBlock(
    postId: string,
    content: ContentBlock,
    transaction: Knex.Transaction
  ) {
    await this.connection("post_content")
      .insert({
        id: content.id,
        content: content.value,
        visible: content.visible,
        order: content.order,
        post_id: postId,
      })
      .transacting(transaction);
  }
}
