import { Request, Response } from "express";
import { HealthService } from "../services/health.service";
import { HTTP_STATUS } from "../utils/http-status";
import { ApiResponse } from "../types/api-response";

export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  getHealth = (_req: Request, res: Response<ApiResponse<{ status: string; timestamp: string }>>) => {
    const healthStatus = this.healthService.getHealthStatus();

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "API is running.",
      data: healthStatus,
    });
  };
}
