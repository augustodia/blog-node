import {
  GetPostContentQueryResponse,
  GetPostQueryResponse,
} from "@infra/data/query-responses";
import { ContentBlock, Post, PostAuthor } from "@entities";

export default class PostMapper {
  static mapOne(
    postResult: GetPostQueryResponse,
    postContentResult: GetPostContentQueryResponse[]
  ): Post {
    const contentBlocks = postContentResult.map(
      (content) =>
        new ContentBlock({
          id: content.id,
          order: content.order,
          type: content.type,
          visible: content.visible === 1,
          value: content.content,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
        })
    );

    return new Post({
      id: postResult.id,
      title: postResult.title,
      author: new PostAuthor({
        id: postResult.authorId,
        userName: postResult.authorUserName,
      }),
      published: postResult.published === 1,
      createdAt: postResult.createdAt,
      updatedAt: postResult.updatedAt,
      contentBlocks,
    });
  }

  static mapMany(
    postsResult: GetPostQueryResponse[],
    postContentResult: GetPostContentQueryResponse[]
  ): Post[] {
    return postsResult.map((post) => {
      const contentBlocks = postContentResult
        .filter((content) => content.postId === post.id)
        .map(
          (content) =>
            new ContentBlock({
              id: content.id,
              order: content.order,
              type: content.type,
              visible: content.visible === 1,
              value: content.content,
              createdAt: content.createdAt,
              updatedAt: content.updatedAt,
            })
        );

      return new Post({
        id: post.id,
        title: post.title,
        author: new PostAuthor({
          id: post.authorId,
          userName: post.authorUserName,
        }),
        published: post.published === 1,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        contentBlocks,
      });
    });
  }
}
