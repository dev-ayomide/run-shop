import { Router } from "express";
import { PaymentController } from "./controller";
import { authGuard } from "../../middlewares";
import { validateInitiatePayment, validateVerifyPayment } from "../../middlewares/validators/payment";

const router = Router();
const paymentController = new PaymentController();

router.post(
  "/initiate",
  authGuard,
  validateInitiatePayment,
  paymentController.initiatePayment
);

router.get(
  "/verify/:reference",
  authGuard,
  validateVerifyPayment,
  paymentController.verifyPayment
);


router.post("/webhook", paymentController.handleWebhook);

export default router;
