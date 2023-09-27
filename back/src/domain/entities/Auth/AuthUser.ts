import { IEntity, IEntityProps } from "@interfaces/entities/IEntity";

export interface IAuthUser extends IEntityProps {
  id?: string;
  email: string;
  userName: string;
  hashPassword: string;
}

export class AuthUser extends IEntity {
  private readonly _email: string;
  private readonly _userName: string;
  private readonly _hashPassword: string;

  constructor(props: IAuthUser) {
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

  get hashPassword(): string {
    return this._hashPassword;
  }
}
