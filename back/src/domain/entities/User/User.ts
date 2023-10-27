import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";
import { UserDto } from "@DTO";

export interface IUser extends IEntityProps {
  id?: string;
  email: string;
  userName: string;
  hashPassword?: string;
}

export class User extends IEntity {
  private readonly _email: string;
  private readonly _userName: string;
  private readonly _hashPassword?: string;

  constructor(props: IUser) {
    super(props);

    this._email = props.email;
    this._userName = props.userName;
    this._hashPassword = props.hashPassword;
  }

  get userName(): string {
    return this._userName;
  }

  get email(): string {
    return this._email;
  }

  get hashPassword(): string | undefined {
    return this._hashPassword;
  }

  public toDto(): UserDto {
    return {
      id: this.id,
      userName: this.userName,
    };
  }
}
