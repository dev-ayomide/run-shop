import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../service";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";

const paymentService = new PaymentService();
const secret = process.env.PAYSTACK_SECRET_KEY;

export class PaymentController {
  async initiatePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentResponse = await paymentService.initiatePayment(req.body);

      res.status(StatusCodes.OK).json(paymentResponse);
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { reference } = req.params;

      const paymentData = await paymentService.verifyPayment(reference);

      res.status(StatusCodes.OK).json({
        message: "Payment verification successful",
        data: paymentData,
      });
    } catch (error) {
      next(error);
    }
  }

  async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      // ensure an attacker can't send a fake webhook confirmation
      const hash = crypto
        .createHmac("sha512", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");

      if (hash == req.headers["x-paystack-signature"]) {
        const event = req.body;

        setImmediate(async () => {
          await paymentService.handleWebhook(event);
        });

        res.status(StatusCodes.OK).json({
          message: "Webhook processed successfully",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
