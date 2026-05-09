import { ApiErrorDetail } from "../types/api-response";
import { HTTP_STATUS } from "../utils/http-status";

type AppErrorOptions = {
  statusCode?: number;
  code?: string;
  errors?: ApiErrorDetail[];
};

export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly errors?: ApiErrorDetail[];

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message);
    this.name = "AppError";
    this.statusCode = options.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    this.code = options.code ?? "INTERNAL_SERVER_ERROR";
    this.errors = options.errors;
  }
}
