import { Container } from "inversify";
import { IUserController } from "@application/controllers/@interfaces";
import UserController from "@application/controllers/user/UserController";
import {UserService} from "@services";
import {IUserRepository, IUserService} from "@interfaces";
import {UserRepository} from "@repositories";

const container = new Container({skipBaseClassChecks: true});

container.bind(IUserController).to(UserController);
container.bind(IUserService).to(UserService);
container.bind(IUserRepository).to(UserRepository);

export default container;