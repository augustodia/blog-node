import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";

export enum ContentBlockEnum {
  Text = "text",
}

export interface IContentBlock extends IEntityProps {
  id?: string;
  value: string;
  visible: boolean;
  order: number;
  type: ContentBlockEnum;
}

export class ContentBlock extends IEntity {
  private readonly _value: string;
  private readonly _visible: boolean;
  private readonly _order: number;

  constructor(props: IContentBlock) {
    super(props);

    this._value = props.value;
    this._visible = props.visible;
    this._order = props.order;
  }

  get visible(): boolean {
    return this._visible;
  }

  get value(): string {
    return this._value;
  }

  get order(): number {
    return this._order;
  }
}
