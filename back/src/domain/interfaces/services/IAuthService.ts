import { AuthUserDto, RefreshTokenDto, UserCredentialsDto } from "@DTO";
export abstract class IAuthService {
  abstract login(userCredentials: UserCredentialsDto): Promise<AuthUserDto>;

  abstract refreshUserToken(refreshToken: string): Promise<RefreshTokenDto>;
}
