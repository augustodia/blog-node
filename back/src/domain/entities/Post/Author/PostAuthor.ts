import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";
import { PostAuthorDto } from "@DTO";

export interface IPostAuthor extends IEntityProps {
  id?: string;
  userName: string;
}

export class PostAuthor extends IEntity {
  private readonly _userName: string;
  constructor(props: IPostAuthor) {
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
