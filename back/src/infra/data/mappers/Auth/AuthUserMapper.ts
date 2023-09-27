import { FindAuthUserQueryResponse } from "@infra/data/query-responses";
import { AuthUser } from "@entities";

export default class AuthUserMapper {
  static mapOne(result: FindAuthUserQueryResponse): AuthUser {
    return new AuthUser({
      id: result.id,
      userName: result.userName,
      email: result.email,
      hashPassword: result.password,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}
