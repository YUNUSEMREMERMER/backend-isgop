import { Router } from "express";
import { healthController } from "../modules/health/health.module";

export const healthRouter = Router();

healthRouter.get("/", healthController.getHealth);
