import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { verifyAccessToken } from "../utils/jwt";
import { HTTP_STATUS } from "../utils/http-status";
import { UserRoleValue, isUserRoleValue } from "../utils/user-role";

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return next(
      new AppError("Authorization token is required.", {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        code: "UNAUTHORIZED",
      }),
    );
  }

  const token = authorizationHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyAccessToken(token);

    if (!isUserRoleValue(payload.role)) {
      throw new Error("Invalid role.");
    }

    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch {
    next(
      new AppError("Invalid or expired token.", {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        code: "INVALID_TOKEN",
      }),
    );
  }
};

export const authorizeRoles = (...roles: UserRoleValue[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new AppError("Authentication required.", {
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          code: "UNAUTHORIZED",
        }),
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to access this resource.", {
          statusCode: HTTP_STATUS.FORBIDDEN,
          code: "FORBIDDEN",
        }),
      );
    }

    next();
  };
};
