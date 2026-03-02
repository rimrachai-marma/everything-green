import { z, type ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

import ErrorResponse from "../utilities/errorResponse";

export const validateRequestBody = (schema: ZodType) => async (req: Request, _: Response, next: NextFunction) => {
  console.log(req.body);

  const parsed = await schema.safeParseAsync(req.body);

  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    throw new ErrorResponse("Validation failed", 400, flattened.fieldErrors);
  }

  return next();
};

export const validateRequestQuery = (schema: ZodType) => async (req: Request, _: Response, next: NextFunction) => {
  const parsed = await schema.safeParseAsync(req.query);

  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    throw new ErrorResponse("Validation failed", 400, flattened.fieldErrors);
  }

  return next();
};
