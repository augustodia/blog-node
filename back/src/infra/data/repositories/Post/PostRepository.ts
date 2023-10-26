import { injectable } from "inversify";
import BaseRepository from "@infra/data/repositories/BaseRepository";
import { IPostRepository } from "@interfaces";
import { ContentBlock, Post } from "@entities";
import { UserContext } from "@DTO";
import { Knex } from "knex";
import {
  FindPostContentQueryResponse,
  FindPostQueryResponse,
} from "@infra/data/query-responses";
import PostMapper from "@infra/data/mappers/Post/PostMapper";

import { getDifferencesInListsOfObjects } from "../../../../helpers/getDifferencesInLists";

@injectable()
export class PostRepository extends BaseRepository implements IPostRepository {
  async findBy(where: {
    column: string;
    value: any;
  }): Promise<Post | undefined> {
    const resultPost = await this.connection("post")
      .select<FindPostQueryResponse>(
        "id",
        "userId",
        "title",
        "published",
        "createdAt",
        "updatedAt"
      )
      .where((builder) => {
        builder.where(where.column, where.value);
      })
      .first();

    if (!resultPost) return undefined;

    const resultPostContent = await this.connection("postContent")
      .select<FindPostContentQueryResponse[]>(
        "id",
        "postId",
        "order",
        "content",
        "type",
        "visible"
      )
      .where("postId", resultPost.id);

    return PostMapper.mapOne(resultPost, resultPostContent);
  }

  async findByWithPermission(
    where: {
      column: string;
      value: any;
    },
    context: UserContext
  ): Promise<Post | undefined> {
    const resultPost = await this.connection("post")
      .select<FindPostQueryResponse>(
        "id",
        "userId",
        "title",
        "published",
        "createdAt",
        "updatedAt"
      )
      .where((builder) => {
        builder.where(where.column, where.value);
      })
      .andWhere("userId", context.userId)
      .first();

    if (!resultPost) return undefined;

    const resultPostContent = await this.connection("postContent")
      .select<FindPostContentQueryResponse[]>(
        "id",
        "postId",
        "order",
        "content",
        "type",
        "visible"
      )
      .where("postId", resultPost.id);

    return PostMapper.mapOne(resultPost, resultPostContent);
  }

  async create(entity: Post, context: UserContext) {
    const transaction = await this.connection.transaction();
    try {
      const postId = await this.insertPost(entity, context, transaction);

      if (entity.contentBlocks.length > 0)
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

  async update(entity: Post) {
    const transaction = await this.connection.transaction();

    try {
      const postId = await this.updatePost(entity, transaction);

      await this.resolvePostContent(postId, entity.contentBlocks, transaction);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private async resolvePostContent(
    postId: string,
    newContentBlocks: ContentBlock[],
    transaction: Knex.Transaction
  ) {
    const postToUpdate = await this.findBy({ column: "id", value: postId });

    if (!postToUpdate) throw Error("Error while get Entity");

    const { additions, updates, deletions } = getDifferencesInListsOfObjects({
      originalList: postToUpdate.contentBlocks,
      updatedList: newContentBlocks,
      idField: "id",
      nonComparableUpdateFields: ["createdAt", "updatedAt"],
    });

    const contentPostPromises = [
      ...additions.map((contentPost) =>
        this.insertContentBlock(postToUpdate.id, contentPost, transaction)
      ),
      ...updates.map((contentPost) =>
        this.updateContent(contentPost, transaction)
      ),
      ...deletions.map((contentPost) =>
        this.deleteContent(contentPost, transaction)
      ),
    ];

    await Promise.all(contentPostPromises);
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
        userId: context.userId,
      })
      .transacting(transaction);

    return entity.id;
  }

  private async insertContentBlock(
    postId: string,
    content: ContentBlock,
    transaction: Knex.Transaction
  ) {
    await this.connection("postContent")
      .insert({
        id: content.id,
        content: content.value,
        visible: content.visible,
        order: content.order,
        postId: postId,
      })
      .transacting(transaction);
  }

  private async updatePost(entity: Post, transaction: Knex.Transaction) {
    await this.connection("post")
      .update({
        id: entity.id,
        title: entity.title,
        published: entity.published,
      })
      .where("id", entity.id)
      .transacting(transaction);

    return entity.id;
  }

  private async updateContent(
    contentPost: ContentBlock,
    transaction: Knex.Transaction
  ) {
    const rowsAffected = await this.connection("postContent")
      .update({
        order: contentPost.order,
        content: contentPost.value,
        type: contentPost.type,
        visible: contentPost.visible,
        updatedAt: new Date(),
      })
      .where("id", contentPost.id)
      .transacting(transaction);

    if (rowsAffected === 0) throw Error("Error while update ContentPost");
  }

  private async deleteContent(
    contentPost: ContentBlock,
    transaction: Knex.Transaction
  ) {
    const rowsAffected = await this.connection("postContent")
      .delete()
      .where("id", contentPost.id)
      .transacting(transaction);

    if (rowsAffected === 0) throw Error("Error while deleting ContentPost");
  }

  async inactivate(entity: Post): Promise<void> {
    const rowsAffected = await this.connection("post")
      .update({
        active: false,
      })
      .where("id", entity.id);

    if (rowsAffected === 0) throw Error("Error while inactivate Post");
  }

  async reactivate(entity: Post): Promise<void> {
    const rowsAffected = await this.connection("post")
      .update({
        active: true,
      })
      .where("id", entity.id);

    if (rowsAffected === 0) throw Error("Error while inactivate Post");
  }

  async delete(entity: Post): Promise<void> {
    await this.connection("postContent").delete().where("postId", entity.id);

    const rowsAffected = await this.connection("post")
      .delete()
      .where("id", entity.id);

    if (rowsAffected === 0) throw Error("Error while inactivate Post");
  }
}
