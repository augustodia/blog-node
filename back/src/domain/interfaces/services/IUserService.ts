import { UserCreateDto } from "@application/validators";

export abstract class IUserService {
  abstract create(dto: UserCreateDto): Promise<any>;
}
