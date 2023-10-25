import { Request, Response } from "express";
import { UserCreateSchema } from "src/domain/validators";
import { injectable } from "inversify";
import IUserController from "@application/controllers/@shared/interfaces/IUserController";
import { IUserService } from "@interfaces";

@injectable()
export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async create(req: Request, res: Response) {
    const { body } = req;

    const dto = UserCreateSchema.parse(body);

    await this.service.create(dto);

    return res.status(201).send();
  }
}
