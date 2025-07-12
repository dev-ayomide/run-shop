import { CartController } from "./controller";
import { Router } from "express";
import { authGuard, idValidator } from "../../middlewares";
import { validateAddProductToCart, validateAddMultipleProductsToCart, validateRemoveProductFromCart } from "./validators";

const cartController = new CartController();

const router = Router();

router.post("/add", authGuard, validateAddProductToCart, cartController.addProductToCart);
router.post("/add-multiple", authGuard, validateAddMultipleProductsToCart, cartController.addMultipleProductsToCart);
router.delete("/remove-item/:id", authGuard, idValidator, cartController.removeProductFromCart);
router.get("/", authGuard, cartController.getUserCart);

export default router;
