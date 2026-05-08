import cors from "cors";
import express from "express";
import { apiRouter } from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";
import { HTTP_STATUS } from "./utils/http-status";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Welcome to backend-isgop API.",
  });
});

app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
