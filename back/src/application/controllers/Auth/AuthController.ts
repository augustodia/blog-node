import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { IAuthController } from "src/application/controllers/@shared/interfaces";
import { Request, Response } from "express";
import { IAuthService } from "@interfaces";
import * as process from "process";
import { UserCredentialsSchema, UserRefreshTokenSchema } from "@DTO";

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

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const dto = UserRefreshTokenSchema.parse(body);

    if (!dto.refreshToken) {
      return res.status(403).send({ error: "No refresh token provided" });
    }

    const { token } = await this.service.refreshUserToken(dto.refreshToken);

    return res.status(200).send({ token });
  }
}
