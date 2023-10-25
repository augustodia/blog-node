import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";
import { ContentBlock } from "./ContentBlock";

export interface IPost extends IEntityProps {
  id?: string;
  title: string;
  published: boolean;
  contentBlocks?: ContentBlock[];
}

export class Post extends IEntity {
  private readonly _title: string;
  private readonly _published: boolean;
  private readonly _contentBlocks: ContentBlock[];

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

  public addContent(contentBlock: ContentBlock): void {
    this._contentBlocks.push(contentBlock);
  }

  public updateContent(contentBlock: ContentBlock): void {
    const blockToUpdateIdx = this._contentBlocks.findIndex(
      ({ id }) => id == contentBlock.id
    );

    if (blockToUpdateIdx === -1) return;

    this._contentBlocks[blockToUpdateIdx] = contentBlock;
  }

  public deleteContent(contentBlock: ContentBlock): void {
    const blockToDeleteIdx = this._contentBlocks.findIndex(
      ({ id }) => id == contentBlock.id
    );

    if (blockToDeleteIdx === -1) return;

    this._contentBlocks.splice(blockToDeleteIdx, 1);
  }
}
