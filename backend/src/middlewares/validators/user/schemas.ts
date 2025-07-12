import Joi from "joi";

export const validateId = Joi.object({
  user_id: Joi.string().required(),
});


export const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  shippingAddress: Joi.string().optional(),
});

export const reviewSellerSchema = Joi.object({
  productId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  review: Joi.string().optional(),
});
