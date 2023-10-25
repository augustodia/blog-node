import { injectable } from "inversify";
import { compare } from "bcryptjs";
import { IAuthRepository, IAuthService } from "@interfaces";
import { UserCredentialsDto } from "src/domain/validators";
import { AuthUserDTO } from "@DTO";
import { UnauthorizedError } from "@application/controllers/@shared/errors";

@injectable()
export class AuthService implements IAuthService {
  constructor(private repository: IAuthRepository) {}

  async login(userCredentials: UserCredentialsDto): Promise<AuthUserDTO> {
    const user = await this.repository.findByEmail(userCredentials.email);

    const isMatch = await compare(
      userCredentials.password,
      user?.hashPassword ?? ""
    );

    if (!user || !isMatch)
      throw new UnauthorizedError("Email or password are incorrect");

    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
    };
  }
}
