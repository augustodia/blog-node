import { Request, Response } from "express";

export default abstract class IUserController {
  abstract create(req: Request, res: Response): Promise<Response>;
  abstract update(req: Request, res: Response): Promise<Response>;
  abstract inactivate(req: Request, res: Response): Promise<Response>;
  abstract delete(req: Request, res: Response): Promise<Response>;
}
