import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/app-error";
import { sendErrorResponse } from "../utils/api-response";
import { HTTP_STATUS } from "../utils/http-status";

export const notFoundHandler = (req: Request, res: Response) => {
  return sendErrorResponse(res, {
    statusCode: HTTP_STATUS.NOT_FOUND,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return sendErrorResponse(res, {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      message: "Validation failed.",
      errors: error.issues.map((issue) => ({
        field: issue.path.join(".") || undefined,
        message: issue.message,
      })),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    const fields = Array.isArray(error.meta?.target) ? error.meta.target : [];

    return sendErrorResponse(res, {
      statusCode: HTTP_STATUS.CONFLICT,
      message: "Resource already exists.",
      errors: fields.map((field) => ({
        field: String(field),
        message: `${String(field)} already exists.`,
      })),
    });
  }

  if (error instanceof AppError) {
    return sendErrorResponse(res, {
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors,
    });
  }

  return sendErrorResponse(res, {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: error.message || "Internal server error.",
  });
};
