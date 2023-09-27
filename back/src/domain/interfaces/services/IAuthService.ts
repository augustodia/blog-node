import { UserCredentialsDto } from "@application/validators";
import { AuthUserDTO } from "@DTO";

export abstract class IAuthService {
  abstract login(userCredentials: UserCredentialsDto): Promise<AuthUserDTO>;
}
