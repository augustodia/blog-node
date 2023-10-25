import { UserCreateDto } from "@DTO";
import { User } from "@entities";

export abstract class IUserService {
  abstract create(dto: UserCreateDto): Promise<void>;
  abstract findById(userId: string): Promise<User | undefined>;
}
