import { injectable } from "inversify";
import { compare } from "bcryptjs";
import { IAuthRepository, IAuthService } from "@interfaces";
import { AuthUserDto, RefreshTokenDto, UserCredentialsDto } from "@DTO";
import { UnauthorizedError } from "@application/controllers/@shared/errors";
import jwt from "jsonwebtoken";

@injectable()
export class AuthService implements IAuthService {
  constructor(private repository: IAuthRepository) {}

  async login(userCredentials: UserCredentialsDto): Promise<AuthUserDto> {
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

  async refreshUserToken(refreshToken: string): Promise<RefreshTokenDto> {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET as string);

    if (typeof payload.sub != "string") throw new Error("User not found");

    const userId = payload.sub;

    const user = await this.repository.getUserById(userId);

    if (!user) throw new Error("User not found");

    const newToken = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "15m",
    });

    return { token: newToken };
  }
}
