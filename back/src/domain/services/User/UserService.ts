import { injectable } from "inversify";
import { hash, genSalt } from "bcryptjs";
import { User } from "@entities";
import { IUserRepository, IUserService } from "@interfaces";
import { UserCreateDto } from "@DTO";

@injectable()
export default class UserService implements IUserService {
  constructor(private repository: IUserRepository) {}

  async findById(userId: string): Promise<User | undefined> {
    return this.repository.findBy({ column: "id", value: userId });
  }

  async create(dto: UserCreateDto) {
    await this.verifyExistUserWithUserNameOrEmail(dto);

    const hashPassword = await this.passwordToHash(dto);
    const userToInsert = new User({
      userName: dto.userName,
      email: dto.email,
      hashPassword,
    });

    await this.repository.create(userToInsert);
  }

  private async verifyExistUserWithUserNameOrEmail(dto: UserCreateDto) {
    const errors: string[] = [];

    const userWithUserName = await this.repository.findBy({
      column: "userName",
      value: dto.userName,
    });
    if (userWithUserName)
      errors.push("There is already a user with this userName");

    const userWithEmail = await this.repository.findBy({
      column: "email",
      value: dto.email,
    });
    if (userWithEmail) errors.push("There is already a user with this email");

    if (errors.length > 0) throw errors;
  }

  private async passwordToHash(dto: UserCreateDto) {
    const salt = await genSalt();

    return hash(dto.password, salt);
  }
}
