import express, { Application } from "express";
import dotenv from "dotenv";

import initiateRoutes from "@application/controllers/routes";

const app: Application = express();

dotenv.config();
app.use(express.json({ limit: "50mb" }));
initiateRoutes(app);

export default app;
