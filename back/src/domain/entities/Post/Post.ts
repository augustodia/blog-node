import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";
import { ContentBlock, PostAuthor } from "./";
import { PostDto, PostTeaserDto } from "@DTO";

export interface IPost extends IEntityProps {
  id?: string;
  title: string;
  published: boolean;
  author: PostAuthor;
  contentBlocks: ContentBlock[];
}

export class Post extends IEntity {
  private _title: string;
  private _published: boolean;
  private readonly _author: PostAuthor;
  private _contentBlocks: ContentBlock[];

  constructor(props: IPost) {
    super(props);

    this._title = props.title;
    this._published = props.published;
    this._author = props.author;
    this._contentBlocks = props.contentBlocks;
  }

  get published(): boolean {
    return this._published;
  }

  get title(): string {
    return this._title;
  }

  get author(): PostAuthor {
    return this._author;
  }

  get contentBlocks(): ContentBlock[] {
    return this._contentBlocks;
  }

  public update(postUpdate: IPost) {
    this._title = postUpdate.title;
    this._published = postUpdate.published;
    this._title = postUpdate.title;

    if (postUpdate.contentBlocks)
      this.updateContentBlocks(postUpdate.contentBlocks);
  }

  public updateContentBlocks(contentBlocks: ContentBlock[]) {
    this._contentBlocks = contentBlocks;
  }

  public toDto(): PostDto {
    return {
      id: this.id,
      title: this.title,
      author: this.author.toDto(),
      contentBlocks: this.contentBlocks.map((content) => content?.toDto()),
      createdAt: this.createdAt,
    };
  }

  public toTeaserDto(): PostTeaserDto {
    let firstContent = "";

    if (this.contentBlocks.length > 0)
      firstContent = this.contentBlocks[0].value;

    return {
      id: this.id,
      title: this.title,
      author: this.author.toDto(),
      contentTeaser: firstContent.slice(0, 300),
      createdAt: this.createdAt,
    };
  }
}
