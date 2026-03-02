import type { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utilities/errorResponse";

export const routeNotFound = (req: Request, _: Response, next: NextFunction) => {
  const error = new ErrorResponse(`Route Not Found - ${req.method} - ${req.originalUrl}`, 404);

  next(error);
};

export const errorHandler = (err: any, _: Request, res: Response, __: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    console.error("Error: ", err);
  }

  let message = "Internal server error";
  const statusCode = err?.statusCode ?? 500;
  const errors = err?.errors ?? null;
  if (err instanceof ErrorResponse) message = err.message;

  res.status(statusCode).json({
    status: "error",
    message,

    ...(errors && { errors }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
