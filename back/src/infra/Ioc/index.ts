import { Container } from "inversify";
import {
  IAuthController,
  IUserController,
} from "@application/controllers/@interfaces";
import UserController from "@application/controllers/user/UserController";
import AuthController from "@application/controllers/auth/AuthController";

import { UserService, AuthService } from "@services";
import {
  IAuthRepository,
  IAuthService,
  IUserRepository,
  IUserService,
} from "@interfaces";
import { UserRepository } from "@repositories";
import { AuthRepository } from "@infra/data/repositories/Auth";

const container = new Container({ skipBaseClassChecks: true });

container.bind(IUserController).to(UserController);
container.bind(IAuthController).to(AuthController);

container.bind(IUserService).to(UserService);
container.bind(IAuthService).to(AuthService);

container.bind(IUserRepository).to(UserRepository);
container.bind(IAuthRepository).to(AuthRepository);

export default container;
