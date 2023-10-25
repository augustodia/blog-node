import {Request, Response} from "express";

export default abstract class IUserController {
    abstract create(req: Request, res: Response): Promise<Response>
}