import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";
import { ContentBlockDto } from "@DTO";

export enum ContentBlockTypeEnum {
  Text = "text",
}

export interface IContentBlock extends IEntityProps {
  id?: string;
  value: string;
  visible: boolean;
  order: number;
  type: ContentBlockTypeEnum;
}

export class ContentBlock extends IEntity {
  private _value: string;
  private _visible: boolean;
  private _order: number;
  private _type: ContentBlockTypeEnum;

  constructor(props: IContentBlock) {
    super(props);

    this._value = props.value;
    this._visible = props.visible;
    this._order = props.order;
    this._type = props.type;
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
  get type(): ContentBlockTypeEnum {
    return this._type;
  }

  set visible(visible) {
    this._visible = visible;
  }

  set value(value) {
    this._value = value;
  }

  set order(order) {
    this._order = order;
  }

  set type(type) {
    this._type = type;
  }

  public toDto(): ContentBlockDto {
    return {
      id: this.id,
      order: this.order,
      type: this.type,
      value: this.value,
    };
  }
}
