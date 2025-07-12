import { Request, Response, NextFunction } from 'express';
import { addProductToCartSchema, addMultipleProductsToCartSchema, removeProductFromCartSchema } from './schemas';
import { StatusCodes } from 'http-status-codes';

export const validateAddProductToCart = (req: Request, res: Response, next: NextFunction) => {
  const { error } = addProductToCartSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
  next();
};

export const validateAddMultipleProductsToCart = (req: Request, res: Response, next: NextFunction) => {
  const { error } = addMultipleProductsToCartSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
  next();
};

export const validateRemoveProductFromCart = (req: Request, res: Response, next: NextFunction) => {
  const { error } = removeProductFromCartSchema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
  next();
}; 