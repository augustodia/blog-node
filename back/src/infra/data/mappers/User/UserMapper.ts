import { FindUserQueryResponse } from "@infra/data/query-responses";
import { User } from "@entities";

export default class UserMapper {
  static mapOne(result: FindUserQueryResponse): User {
    return new User({
      id: result.id,
      userName: result.userName,
      email: result.email,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}
