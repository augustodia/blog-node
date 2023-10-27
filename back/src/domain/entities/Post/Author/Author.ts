import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";
import { PostAuthorDto } from "@DTO";

export interface IAuthor extends IEntityProps {
  id?: string;
  userName: string;
}

export class Author extends IEntity {
  private readonly _userName: string;
  constructor(props: IAuthor) {
    super(props);

    this._userName = props.userName;
  }

  get userName(): string {
    return this._userName;
  }

  public toDto(): PostAuthorDto {
    return {
      id: this.id,
      userName: this.userName,
    };
  }
}
