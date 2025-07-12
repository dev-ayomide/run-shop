import { Request, Response, NextFunction } from "express";
import { validateId, updateUserSchema, reviewSellerSchema } from "./schemas";

export const validateUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateId.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

export const validateUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ message: error.details.map((err) => err.message).join(", ") });
  }

  next();
};

export const validateReviewSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = reviewSellerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details.map((err) => err.message).join(", ") });
  }
  next();
};