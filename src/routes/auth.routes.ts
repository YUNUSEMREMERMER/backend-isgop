import { Router } from "express";
import { authController } from "../modules/auth/auth.module";
import { requireAuth } from "../middlewares/auth";
import { validateRequest } from "../middlewares/validate-request";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), authController.register);
authRouter.post("/login", validateRequest(loginSchema), authController.login);
authRouter.get("/me", requireAuth, authController.me);
