import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validateRequest = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsedRequest = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    }) as {
      body: Request["body"];
      params: Request["params"];
      query: Request["query"];
    };

    req.body = parsedRequest.body;

    next();
  };
};
