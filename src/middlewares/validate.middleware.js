import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));

  if (!errors.isEmpty()) {
    throw new ApiError(422, "Validation error", extractedErrors);
  }
  next();
};
