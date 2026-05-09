import cors from "cors";
import express from "express";
import { apiRouter } from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";
import { HTTP_STATUS } from "./utils/http-status";
import { sendSuccessResponse } from "./utils/api-response";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  return sendSuccessResponse(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Welcome to backend-isgop API.",
  });
});

app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
