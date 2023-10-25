import { Request } from "express";

export default interface CustomRequest extends Request {
  context?: {
    userId: string;
  };
  userId?: string;
}
