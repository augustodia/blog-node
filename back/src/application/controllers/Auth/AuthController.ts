import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { IAuthController } from "src/application/controllers/@shared/interfaces";
import { Request, Response } from "express";
import { IAuthService } from "@interfaces";
import { UserCredentialsSchema } from "src/domain/validators";
import * as process from "process";

@injectable()
export default class AuthController implements IAuthController {
  constructor(private service: IAuthService) {}
  async login(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const userCredentialsDto = UserCredentialsSchema.parse(body);

    const user = await this.service.login(userCredentialsDto);

    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "7d",
    });

    return res.status(200).send({ token, refreshToken });
  }
}
