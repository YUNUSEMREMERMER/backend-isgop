import { Response } from "express";
import { ApiErrorDetail, ApiResponse } from "../types/api-response";

type SuccessResponseOptions<T> = {
  statusCode: number;
  message: string;
  data?: T;
};

type ErrorResponseOptions = {
  statusCode: number;
  message: string;
  errors?: ApiErrorDetail[];
};

export const sendSuccessResponse = <T>(
  res: Response<ApiResponse<T>>,
  options: SuccessResponseOptions<T>,
) => {
  return res.status(options.statusCode).json({
    success: true,
    message: options.message,
    data: options.data,
  });
};

export const sendErrorResponse = (
  res: Response<ApiResponse>,
  options: ErrorResponseOptions,
) => {
  return res.status(options.statusCode).json({
    success: false,
    message: options.message,
    errors: options.errors,
  });
};
