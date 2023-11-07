import { injectable } from "inversify";
import { Knex } from "knex";
import BaseRepository from "@infra/data/repositories/BaseRepository";
import { IPostRepository } from "@interfaces";
import { ContentBlock, Post } from "@entities";
import { UserContext } from "@DTO";
import {
  GetPostContentQueryResponse,
  GetPostQueryResponse,
} from "@infra/data/query-responses";
import PostMapper from "@infra/data/mappers/Post/PostMapper";

import { getDifferencesInListsOfObjects } from "../../../../helpers/getDifferencesInLists";

@injectable()
export class PostRepository extends BaseRepository implements IPostRepository {
  async getAll(): Promise<Post[]> {
    const result = await this.connection("post")
      .select<GetPostQueryResponse[]>(
        this.connection.ref("post.id").as("id"),
        this.connection.ref("post.title").as("title"),
        this.connection.ref("post.createdAt").as("createdAt"),
        this.connection.ref("post.published").as("published"),
        this.connection.ref("post.updatedAt").as("updatedAt"),
        this.connection.ref("user.id").as("authorId"),
        this.connection.ref("user.userName").as("authorUserName")
      )
      .innerJoin("user", function innerJoinUser() {
        this.on("user.id", "post.userId").andOnVal("user.active", true);
      })
      .where("post.active", true)
      .andWhere("post.published", true)
      .orderBy("post.createdAt", "DESC");

    const postIds = [...new Set(result.map(({ id }) => id))];

    const resultPostContents = await this.connection("postContent")
      .select<GetPostContentQueryResponse[]>(
        "id",
        "postId",
        "order",
        "content",
        "type",
        "visible"
      )
      .where("visible", true)
      .whereIn("postId", postIds)
      .orderBy("order");

    return PostMapper.mapMany(result, resultPostContents);
  }
  async findBy(
    where: {
      column: string;
      value: any;
    },
    onlyActive: boolean = true
  ): Promise<Post | undefined> {
    const resultPost = await this.connection("post")
      .select<GetPostQueryResponse>(
        this.connection.ref("post.id").as("id"),
        this.connection.ref("post.title").as("title"),
        this.connection.ref("post.createdAt").as("createdAt"),
        this.connection.ref("post.published").as("published"),
        this.connection.ref("post.updatedAt").as("updatedAt"),
        this.connection.ref("user.id").as("authorId"),
        this.connection.ref("user.userName").as("authorUserName")
      )
      .innerJoin("user", function innerJoinUser() {
        this.on("user.id", "post.userId").andOnVal("user.active", true);
      })
      .where((builder) => {
        builder.where(`post.${where.column}`, where.value);

        if (onlyActive) {
          builder.where("post.active", true).andWhere("post.published", true);
        }
      })
      .first();

    if (!resultPost) return undefined;

    const resultPostContent = await this.connection("postContent")
      .select<GetPostContentQueryResponse[]>(
        "id",
        "postId",
        "order",
        "content",
        "type",
        "visible"
      )
      .where((builder) => {
        if (onlyActive) {
          builder.where("visible", true);
        }
      })
      .andWhere("postId", resultPost.id);

    return PostMapper.mapOne(resultPost, resultPostContent);
  }

  async getByUser(userId: string): Promise<Post[]> {
    const result = await this.connection("post")
      .select<GetPostQueryResponse[]>(
        this.connection.ref("post.id").as("id"),
        this.connection.ref("post.title").as("title"),
        this.connection.ref("post.createdAt").as("createdAt"),
        this.connection.ref("post.published").as("published"),
        this.connection.ref("post.updatedAt").as("updatedAt"),
        this.connection.ref("user.id").as("authorId"),
        this.connection.ref("user.userName").as("authorUserName")
      )
      .innerJoin("user", function innerJoinUser() {
        this.on("user.id", "post.userId").andOnVal("user.active", true);
      })
      .where("post.active", true)
      .andWhere("post.published", true)
      .andWhere("user.id", userId)
      .orderBy("post.createdAt");

    const postIds = [...new Set(result.map(({ id }) => id))];

    const resultPostContents = await this.connection("postContent")
      .select<GetPostContentQueryResponse[]>(
        "id",
        "postId",
        "order",
        "content",
        "type",
        "visible"
      )
      .where("visible", true)
      .whereIn("postId", postIds)
      .orderBy("order");

    return PostMapper.mapMany(result, resultPostContents);
  }

  async findByWithPermission(
    where: {
      column: string;
      value: any;
    },
    context: UserContext,
    onlyActive: boolean = true
  ): Promise<Post | undefined> {
    const resultPost = await this.connection("post")
      .select<GetPostQueryResponse>(
        this.connection.ref("post.id").as("id"),
        this.connection.ref("post.title").as("title"),
        this.connection.ref("post.createdAt").as("createdAt"),
        this.connection.ref("post.published").as("published"),
        this.connection.ref("post.updatedAt").as("updatedAt"),
        this.connection.ref("user.id").as("authorId"),
        this.connection.ref("user.userName").as("authorUserName")
      )
      .innerJoin("user", function innerJoinUser() {
        this.on("user.id", "post.userId").andOnVal("user.active", true);
      })
      .where((builder) => {
        builder.where(where.column, where.value);

        if (onlyActive) {
          builder.where("post.active", true).andWhere("post.published", true);
        }
      })
      .andWhere("userId", context.userId)
      .first();

    if (!resultPost) return undefined;

    const resultPostContent = await this.connection("postContent")
      .select<GetPostContentQueryResponse[]>(
        "id",
        "postId",
        "order",
        "content",
        "type",
        "visible"
      )
      .where((builder) => {
        if (onlyActive) {
          builder.where("visible", true);
        }
      })
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
    const postToUpdate = await this.findBy(
      { column: "id", value: postId },
      false
    );

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
