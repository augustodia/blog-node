import { v4 as uuid } from "uuid";

export interface IEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export abstract class IEntity {
  public id: string;
  public createdAt: Date;
  public updatedAt?: Date | null;

  protected constructor(props: IEntityProps) {
    const now = new Date();

    this.id = props.id ?? uuid();
    this.createdAt = props.createdAt ?? now;
    this.updatedAt = props.updatedAt;
  }
}
