import { PostCreateSchema } from "src/domain/validators";
import { injectable } from "inversify";
import IPostController from "@application/controllers/@shared/interfaces/IPostController";
import { IPostService } from "@interfaces";
import { CustomRequest } from "@application/controllers/@shared/interfaces";
import { getRequestInfo } from "@application/controllers/@shared/helpers/getRequestInfo";
import { Response } from "express";

@injectable()
export default class PostController implements IPostController {
  constructor(private service: IPostService) {}

  async create(req: CustomRequest, res: Response) {
    const { body, context } = getRequestInfo(req);

    const dto = PostCreateSchema.parse(body);

    await this.service.create(dto, context);

    return res.status(201).send();
  }
}
