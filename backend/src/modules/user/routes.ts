import { UserController } from "./controller";
import { Router } from "express";
import {
  validateUpdateUser,
  validateUserId,
  validateReviewSeller,
} from "../../middlewares/validators/user";
import { authGuard } from "../../middlewares";

const userController = new UserController();

const router = Router();

router.get("/:user_id", authGuard, validateUserId, userController.getUserById);
router.put("/update", authGuard, userController.updateUser);
router.post("/rate-product", authGuard, validateReviewSeller, userController.rateProduct);


export default router;
