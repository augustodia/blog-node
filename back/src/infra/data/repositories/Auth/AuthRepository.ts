import { injectable } from "inversify";
import { IAuthRepository } from "@interfaces";
import { AuthUser } from "@entities";
import BaseRepository from "@infra/data/repositories/BaseRepository";
import { FindAuthUserQueryResponse } from "@infra/data/query-responses";
import AuthUserMapper from "@infra/data/mappers/Auth/AuthUserMapper";

@injectable()
export class AuthRepository extends BaseRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<AuthUser | undefined> {
    const result = await this.connection("user")
      .select<FindAuthUserQueryResponse>("id", "userName", "email", "password")
      .where("email", email)
      .andWhere("active", true)
      .first();

    if (!result) return undefined;

    return AuthUserMapper.mapOne(result);
  }
}
