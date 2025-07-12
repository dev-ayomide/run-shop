import Joi from 'joi';

export const addProductToCartSchema = Joi.object({
  cartId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).default(1),
});

export const addMultipleProductsToCartSchema = Joi.object({
  cartId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).default(1),
    })
  ).min(1).required(),
});

export const removeProductFromCartSchema = Joi.object({
  cartId: Joi.string().required(),
  productId: Joi.string().required(),
}); 