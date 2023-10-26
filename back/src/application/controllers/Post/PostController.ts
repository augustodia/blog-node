import { injectable } from "inversify";
import { IPostService } from "@interfaces";
import {
  CustomRequest,
  IPostController,
} from "@application/controllers/@shared/interfaces";
import { getRequestInfo } from "@application/controllers/@shared/helpers/getRequestInfo";
import e, { Response } from "express";
import { PostCreateSchema, PostUpdateSchema } from "@DTO";

@injectable()
export default class PostController implements IPostController {
  constructor(private service: IPostService) {}

  async create(req: CustomRequest, res: Response) {
    const { body, context } = getRequestInfo(req);

    const dto = PostCreateSchema.parse(body);

    await this.service.create(dto, context);

    return res.status(201).send();
  }

  async update(req: CustomRequest, res: Response): Promise<Response> {
    const { body, context, params } = getRequestInfo(req);

    const { idSync } = params;

    if (!idSync) return res.status(400).send("idSync is required");

    const dto = PostUpdateSchema.parse(body);

    await this.service.update(idSync, dto, context);

    return res.status(204).send();
  }

  async inactivate(req: CustomRequest, res: Response): Promise<Response> {
    const { context, params } = getRequestInfo(req);

    const { idSync } = params;

    if (!idSync) return res.status(400).send("idSync is required");

    await this.service.inactivate(idSync, context);

    return res.status(204).send();
  }

  async reactivate(req: CustomRequest, res: Response): Promise<Response> {
    const { context, params } = getRequestInfo(req);

    const { idSync } = params;

    if (!idSync) return res.status(400).send("idSync is required");

    await this.service.reactivate(idSync, context);

    return res.status(204).send();
  }

  async delete(req: CustomRequest, res: Response): Promise<e.Response> {
    const { context, params } = getRequestInfo(req);

    const { idSync } = params;

    if (!idSync) return res.status(400).send("idSync is required");

    await this.service.delete(idSync, context);

    return res.status(200).send();
  }
}
