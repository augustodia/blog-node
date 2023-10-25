import {
  FindPostContentQueryResponse,
  FindPostQueryResponse,
} from "@infra/data/query-responses";
import { ContentBlock, Post } from "@entities";

export default class PostMapper {
  static mapOne(
    postResult: FindPostQueryResponse,
    postContentResult: FindPostContentQueryResponse[]
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
      published: postResult.published === 1,
      createdAt: postResult.createdAt,
      updatedAt: postResult.updatedAt,
      contentBlocks,
    });
  }
}
