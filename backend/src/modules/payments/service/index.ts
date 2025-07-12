import axios from "axios";
import { PaymentResponse, InitiatePaymentRequest } from "../../../utils/types";
import { AppError } from "../../../middlewares";

const PAYSTACK_URL = process.env.PAYSTACK_API_URL;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export class PaymentService {
  initiatePayment = async (paymentData: InitiatePaymentRequest) => {
    try {
      const headers = {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      };

      const {
        data: { data },
      } = await axios.post(PAYSTACK_URL, paymentData, { headers });
      return data;
    } catch (error) {
      console.error("Error initiating Paystack payment:", error.message);
      throw error;
    }
  };

  verifyPayment = async (reference: string) => {
    try {
      const headers = {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      };

      const { data } = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        { headers }
      );

      if (data.status) {
        return data.data;
      } else {
        throw new AppError("Failed to verify Paystack transaction", 500);
      }
    } catch (error: any) {
      console.error("Error verifying Paystack payment:", error.message);
      throw error;
    }
  };

  handleWebhook = async (webhookData: any) => {
    try {
      
      const { event, data } = webhookData;

      if (event === "charge.success") {
        const { reference, amount, status } = data;

        if (status === "success") {
          console.log(
            `Payment successful for reference: ${reference}, amount: ${amount}`
          );
        }
      } else if (event === "charge.failed") {
        const { reference } = data;
        console.log(`Payment failed for reference: ${reference}`);
      }
    } catch (error: any) {
      console.error("Error handling Paystack webhook:", error.message);
      throw error;
    }
  };
}
