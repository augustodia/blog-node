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

  async getAll(req: CustomRequest, res: Response) {
    const posts = await this.service.getAll();

    return res.status(200).send(posts);
  }

  async getById(req: CustomRequest, res: Response) {
    const { params } = req;

    const { id } = params;

    if (!id) return res.status(400).send("id is required");

    const post = await this.service.getById(id);

    return res.status(200).send(post);
  }

  async getByUser(req: CustomRequest, res: Response) {
    const { params } = req;

    const { userId } = params;

    if (!userId) return res.status(400).send("userId is required");

    const post = await this.service.getByUser(userId);

    return res.status(200).send(post);
  }

  async create(req: CustomRequest, res: Response) {
    const { body, context } = getRequestInfo(req);

    const dto = PostCreateSchema.parse(body);

    await this.service.create(dto, context);

    return res.status(201).send();
  }

  async update(req: CustomRequest, res: Response): Promise<Response> {
    const { body, context, params } = getRequestInfo(req);

    const { id } = params;

    if (!id) return res.status(400).send("id is required");

    const dto = PostUpdateSchema.parse(body);

    await this.service.update(id, dto, context);

    return res.status(204).send();
  }

  async inactivate(req: CustomRequest, res: Response): Promise<Response> {
    const { context, params } = getRequestInfo(req);

    const { id } = params;

    if (!id) return res.status(400).send("id is required");

    await this.service.inactivate(id, context);

    return res.status(204).send();
  }

  async reactivate(req: CustomRequest, res: Response): Promise<Response> {
    const { context, params } = getRequestInfo(req);

    const { id } = params;

    if (!id) return res.status(400).send("id is required");

    await this.service.reactivate(id, context);

    return res.status(204).send();
  }

  async delete(req: CustomRequest, res: Response): Promise<e.Response> {
    const { context, params } = getRequestInfo(req);

    const { id } = params;

    if (!id) return res.status(400).send("id is required");

    await this.service.delete(id, context);

    return res.status(200).send();
  }
}
