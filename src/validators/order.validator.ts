import * as Joi from 'joi'

const orderItemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  title: Joi.string().required(),
  price: Joi.number().required(),
  imageUrl: Joi.string().optional(),
});

const orderSchema = Joi.object({
  customerName: Joi.string().required(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  orderItems: Joi.array().items(orderItemSchema).required(),
});


/**
 * Validates the order payload against the order schema.
 * @param payload - The order payload to be validated.
 * @returns {Joi.ValidationResult} - The validation result object from Joi.
 * @throws {Joi.ValidationError} - If the payload does not match the order schema.
 */
export const orderValidator = (payload: any): Joi.ValidationResult => {
  return orderSchema.validate(payload, { abortEarly: false });
};