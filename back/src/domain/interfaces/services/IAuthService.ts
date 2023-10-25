import { AuthUserDTO, UserCredentialsDto } from "@DTO";

export abstract class IAuthService {
  abstract login(userCredentials: UserCredentialsDto): Promise<AuthUserDTO>;
}
