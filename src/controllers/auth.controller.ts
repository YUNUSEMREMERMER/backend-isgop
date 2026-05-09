import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { sendSuccessResponse } from "../utils/api-response";
import { HTTP_STATUS } from "../utils/http-status";
import { ApiResponse } from "../types/api-response";
import { AuthResponse, AuthUser, LoginInput, RegisterInput } from "../types/auth";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: Request<object, ApiResponse<AuthResponse>, RegisterInput>,
    res: Response<ApiResponse<AuthResponse>>,
  ) => {
    const data = await this.authService.register(req.body);

    return sendSuccessResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      message: "User registered successfully.",
      data,
    });
  };

  login = async (
    req: Request<object, ApiResponse<AuthResponse>, LoginInput>,
    res: Response<ApiResponse<AuthResponse>>,
  ) => {
    const data = await this.authService.login(req.body);

    return sendSuccessResponse(res, {
      statusCode: HTTP_STATUS.OK,
      message: "Login successful.",
      data,
    });
  };

  me = async (req: Request, res: Response<ApiResponse<AuthUser>>) => {
    const data = await this.authService.getProfile(req.user!.id);

    return sendSuccessResponse(res, {
      statusCode: HTTP_STATUS.OK,
      message: "Authenticated user fetched successfully.",
      data,
    });
  };
}
