import { AuthService } from "../service";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CartService } from "../../cart/service";
import { verifyToken } from "../../../utils/jwt";

const authService = new AuthService();
const cartService = new CartService();

export class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.register(req.body);
      setImmediate(async () => {
        const id = verifyToken(user.token).id;
        await cartService.createCart(id);
      });
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.login(req.body);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getMe(req.user.email);

      res.status(StatusCodes.OK).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        cart: user.cart,
        hostelName: user.hostelName,
        blockNumber: user.blockNumber,
        roomNo: user.roomNo,
        seller: user.seller,
        sellerCompleted: !!user.seller, // Add sellerCompleted based on whether the user has a seller profile
      });
    } catch (error) {
      next(error);
    }
  };
}
