import { Request, Response } from "express";

export default abstract class IUserController {
  abstract findUser(req: Request, res: Response): Promise<Response>;
  abstract create(req: Request, res: Response): Promise<Response>;
}
