import { CartService } from "../service";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const cartService = new CartService();

export class CartController {
  addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, cartId } = req.body;
      await cartService.addProductToCart(cartId, productId);
      res.status(StatusCodes.CREATED).json({ message: "Product added to cart" });
    } catch (error) {
      next(error);
    }
  };

  removeProductFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await cartService.removeProductFromCart(id);
      res.status(StatusCodes.OK).json({ message: "Product removed from cart" });
    } catch (error) {
      next(error);
    }
  };

  addMultipleProductsToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cartId, items } = req.body; 
      await cartService.addMultipleProductsToCart(cartId, items);
      res.status(StatusCodes.CREATED).json({ message: "Products added to cart" });
    } catch (error) {
      next(error);
    }
  };

  getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const cart = await cartService.getUserCart(id);
      return res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      next(error);
    }
  };
}
