import { Request, Response } from "express";
import { HealthService } from "../services/health.service";
import { HTTP_STATUS } from "../utils/http-status";
import { ApiResponse } from "../types/api-response";
import { sendSuccessResponse } from "../utils/api-response";

export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  getHealth = (_req: Request, res: Response<ApiResponse<{ status: string; timestamp: string }>>) => {
    const healthStatus = this.healthService.getHealthStatus();

    return sendSuccessResponse(res, {
      statusCode: HTTP_STATUS.OK,
      message: "API is running.",
      data: healthStatus,
    });
  };
}
