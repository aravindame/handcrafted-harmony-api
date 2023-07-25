import * as Joi from 'joi'

const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  availableQuantity: Joi.number().required(),
  createdAt: Joi.string().required(),
  isDeleted: Joi.boolean().default(false),
  category: Joi.string().optional(),
  updatedAt: Joi.string().required(),
  imageUrl: Joi.string().optional(),
  price: Joi.number().required(),
});

/**
 * Validates the product payload against the product schema.
 * @param payload - The product payload to be validated.
 * @returns {Joi.ValidationResult} - The validation result object from Joi.
 * @throws {Joi.ValidationError} - If the payload does not match the product schema.
 */
export const productValidator = (payload: any): Joi.ValidationResult => {
  return productSchema.validate(payload, { abortEarly: false });
};