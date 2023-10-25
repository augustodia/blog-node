import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";
import { ContentBlock } from "./ContentBlock";

export interface IPost extends IEntityProps {
  id?: string;
  title: string;
  published: boolean;
  contentBlocks: ContentBlock[];
}

export class Post extends IEntity {
  private _title: string;
  private _published: boolean;
  private _contentBlocks: ContentBlock[];

  constructor(props: IPost) {
    super(props);

    this._title = props.title;
    this._published = props.published;
    this._contentBlocks = props.contentBlocks ?? [];
  }

  get published(): boolean {
    return this._published;
  }

  get title(): string {
    return this._title;
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
}
