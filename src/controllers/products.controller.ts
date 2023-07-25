import { Request, Response } from 'express';
import {createProduct, getProductById, getProducts, deleteProduct, updateProductById} from '../services/product.services';
import logger from '../util/logger.util';

/**
 * Create a new product.
 * @param req - The request object.
 * @param res - The response object.
 */
export async function createProducts(req: Request, res: Response): Promise<void> {
  try {
    const product = await createProduct(req.body);
    res.status(201).send(product);
    logger.info('Product created successfully');
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
}

/**
 * Get all products.
 * @param req - The request object.
 * @param res - The response object.
 */
export async function getProduct(req: Request, res: Response): Promise<void> {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
}

/**
 * Get a product by ID.
 * @param req - The request object.
 * @param res - The response object.
 */
export async function getProductsById(req: Request, res: Response): Promise<void> {
  try {
    const { itemId } = req.params;
    const product = await getProductById(itemId);

    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.status(200).send(product);
      logger.info('Retrieved product by ID');
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
}

/**
 * Delete a product by ID.
 * @param req - The request object.
 * @param res - The response object.
 */
export async function deleteProducts(req: Request, res: Response): Promise<void> {
  try {
    const { itemId } = req.params;
    const product = await deleteProduct(itemId);
    if (!product) {
      res.status(404).send(`Product with itemID = ${itemId} not found`);
    }
    res.status(204).send({});
    logger.info(`Product with itemID = ${itemId} deleted successfully`);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
}

/**
 * Update a product by ID.
 * @param req - The request object.
 * @param res - The response object.
 */
export async function updateProductsById(req: Request, res: Response): Promise<void> {
  try {
    const { itemId } = req.params;
    const product = await updateProductById(itemId, req.body);
    if (!product) {
      res.status(404).json({ message: `Product with itemID = ${itemId} not found` });
    } else {
      res.status(200).json(product);
      logger.info({ message: `Product with itemID = ${itemId} updated successfully` });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send(error);
  }
}
