import { AuthUser } from "@entities";

export abstract class IAuthRepository {
  abstract findByEmail(email: string): Promise<AuthUser | undefined>;
}
