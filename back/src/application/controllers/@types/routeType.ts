import { Router } from "express";

export type RouteType = {
  basePath: string;
  router: Router;
};
