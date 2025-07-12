import Joi from "joi";

export const initiatePaymentSchema = Joi.object({
  email: Joi.string().email().required(),
  amount: Joi.string().required(),
  metadata: Joi.object({
    cartId: Joi.string().required(),
  }).required(),
});

export const verifyPaymentSchema = Joi.object({
  reference: Joi.string().required(),
});