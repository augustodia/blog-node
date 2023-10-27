import BaseRepository from "@infra/data/repositories/BaseRepository";
import { IUserRepository } from "@interfaces";
import { User } from "@entities";
import { injectable } from "inversify";
import { FindUserQueryResponse } from "@infra/data/query-responses";
import UserMapper from "@infra/data/mappers/User/UserMapper";

@injectable()
export class UserRepository extends BaseRepository implements IUserRepository {
  async create(entity: User) {
    await this.connection("user").insert({
      id: entity.id,
      user_name: entity.userName,
      email: entity.email,
      password: entity.hashPassword,
    });
  }

  async findBy(
    where: {
      column: string;
      value: any;
    },
    onlyActive: boolean = true
  ): Promise<User | undefined> {
    const result = await this.connection("user")
      .select<FindUserQueryResponse>(
        "id",
        "userName",
        "email",
        "createdAt",
        "updatedAt"
      )
      .where((builder) => {
        builder.where(where.column, where.value);

        if (onlyActive) builder.where("active", true);
      })
      .first();

    if (!result) return undefined;

    return UserMapper.mapOne(result);
  }
}
