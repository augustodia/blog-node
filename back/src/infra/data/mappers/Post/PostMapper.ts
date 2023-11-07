import {
  GetPostContentQueryResponse,
  GetPostQueryResponse,
} from "@infra/data/query-responses";
import { ContentBlock, Post, Author } from "@entities";

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
          createdAt: new Date(content.createdAt),
          updatedAt: content.updatedAt ? new Date(content.updatedAt) : null,
        })
    );

    return new Post({
      id: postResult.id,
      title: postResult.title,
      author: new Author({
        id: postResult.authorId,
        userName: postResult.authorUserName,
      }),
      published: postResult.published === 1,
      createdAt: new Date(postResult.createdAt),
      updatedAt: postResult.updatedAt ? new Date(postResult.updatedAt) : null,
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
              createdAt: new Date(content.createdAt),
              updatedAt: content.updatedAt ? new Date(content.updatedAt) : null,
            })
        );

      return new Post({
        id: post.id,
        title: post.title,
        author: new Author({
          id: post.authorId,
          userName: post.authorUserName,
        }),
        published: post.published === 1,
        createdAt: new Date(post.createdAt),
        updatedAt: post.updatedAt ? new Date(post.updatedAt) : null,
        contentBlocks,
      });
    });
  }
}
