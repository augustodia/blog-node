import { UserContext } from "@DTO";
import { UnauthorizedError } from "@application/controllers/@shared/errors";
import { CustomRequest } from "@application/controllers/@shared/interfaces";

export type RequestInfo<T> = {
  params: Record<string, string>;
  body: T;
  context: UserContext;
};

export function getRequestInfo<T>(req: CustomRequest): RequestInfo<T> {
  const { body, context, params } = req;

  if (!context) throw new UnauthorizedError("User No Logged");

  return {
    body,
    params,
    context,
  };
}
