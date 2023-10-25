import { Container } from "inversify";
import {
  IAuthController,
  IPostController,
  IUserController,
} from "src/application/controllers/@shared/interfaces";
import UserController from "@application/controllers/User/UserController";
import AuthController from "@application/controllers/Auth/AuthController";
import PostController from "@application/controllers/Post/PostController";

import { UserService, AuthService, PostService } from "@services";
import {
  IAuthRepository,
  IAuthService,
  IPostRepository,
  IPostService,
  IUserRepository,
  IUserService,
} from "@interfaces";
import { UserRepository } from "@repositories";
import { AuthRepository } from "@infra/data/repositories/Auth";
import { PostRepository } from "@infra/data/repositories/Post";

const container = new Container({ skipBaseClassChecks: true });

container.bind(IUserController).to(UserController);
container.bind(IAuthController).to(AuthController);
container.bind(IPostController).to(PostController);

container.bind(IUserService).to(UserService);
container.bind(IAuthService).to(AuthService);
container.bind(IPostService).to(PostService);

container.bind(IUserRepository).to(UserRepository);
container.bind(IAuthRepository).to(AuthRepository);
container.bind(IPostRepository).to(PostRepository);

export default container;
