import { Request, Response } from "express";

export default abstract class IAuthController {
  abstract login(req: Request, res: Response): Promise<Response>;
  abstract refreshToken(req: Request, res: Response): Promise<Response>;
}
