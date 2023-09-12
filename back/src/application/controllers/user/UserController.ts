import { Request, Response } from "express";
import { UserCreateSchema } from "@application/validators";
import { injectable } from "inversify";
import IUserController from "@application/controllers/@interfaces/IUserController";
import { IUserService } from "@interfaces";

@injectable()
export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async create(req: Request, res: Response) {
    const { body } = req;

    const dto = UserCreateSchema.parse(body);

    await this.service.create(dto);

    console.log(req.body);

    return res.status(201).send(req.body);
  }
}
