import { Product } from "../models/products.model";
import { IProduct } from "../types/products.interface";
import { productValidator } from "../validators/product.validator";
import Joi from "joi";

/**
 * Retrieves all active products.
 * @returns A promise that resolves to an array of products.
 * @throws If an error occurs during product retrieval.
 */
export async function getProducts(): Promise<IProduct[]> {
  try {
    const products = await Product.find({ isDeleted: false });
    return products;
  } catch (error) {
    throw error;
  }
}

/**
 * Creates a new product.
 * @param productData - The data for the product.
 * @returns A promise that resolves to the created product.
 * @throws If an error occurs during product creation.
 */
export async function createProduct(productData: IProduct): Promise<IProduct> {
  try {
    const result: Joi.ValidationResult<any> = productValidator(productData);
    if(result?.error){
      throw result?.error;
    }
    const createdProduct = await Product.create(productData);
    return createdProduct;
  } catch (error) {
    throw new Error('Failed to create product.');
  }
}

/**
 * Retrieves a product by its ID.
 * @param itemId - The ID of the product.
 * @returns A promise that resolves to the retrieved product or null if not found.
 * @throws If an error occurs during product retrieval.
 */
export async function getProductById(itemId: string): Promise<IProduct | null> {
  try {
    const product = await Product.findById(itemId);
    return product;
  } catch (error) {
    throw error;
  }
}

/**
 * Updates a product by its ID.
 * @param itemId - The ID of the product to update.
 * @param updateData - The data to update the product with.
 * @returns A promise that resolves to the updated product or null if not found.
 * @throws If an error occurs during product update.
 */
export async function updateProductById(
  itemId: string,
  updateData: any
): Promise<IProduct | null> {
  try {
    const result: Joi.ValidationResult<any> = productValidator(updateData);
    if(result?.error){
      throw result?.error;
    }
    const product = await Product.findByIdAndUpdate(itemId, updateData, {
      new: true,
    });
    return product;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a product by its ID.
 * @param itemId - The ID of the product to disable.
 * @returns A promise that resolves to the updated product or null if not found.
 * @throws If an error occurs during product disabling.
 */
export async function deleteProduct(itemId: string): Promise<IProduct | null> {
  try {
    const product = await Product.findById(itemId);
    if (!product) {
      return;
    }
    product.isDeleted = true;
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
}