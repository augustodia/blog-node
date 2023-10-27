import { UserCreateDto, UserDto } from "@DTO";

export abstract class IUserService {
  abstract create(dto: UserCreateDto): Promise<void>;
  abstract findById(userId: string): Promise<UserDto>;
}
