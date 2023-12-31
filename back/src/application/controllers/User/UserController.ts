import { Request, Response } from "express";
import { injectable } from "inversify";
import IUserController from "@application/controllers/@shared/interfaces/IUserController";
import { IUserService } from "@interfaces";
import { UserCreateSchema } from "@DTO";
import { getRequestInfo } from "@application/controllers/@shared/helpers/getRequestInfo";

@injectable()
export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async create(req: Request, res: Response) {
    const { body } = req;

    const dto = UserCreateSchema.parse(body);

    await this.service.create(dto);

    return res.status(201).send();
  }

  async findUser(req: Request, res: Response) {
    const { params } = req;

    const { id } = params;

    const user = await this.service.findById(id);

    return res.status(201).send(user);
  }

  async getMyProfile(req: Request, res: Response) {
    const { context } = getRequestInfo(req);

    console.log(context);

    const user = await this.service.findById(context.userId);

    return res.status(201).send(user);
  }
}
