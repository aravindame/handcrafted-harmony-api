import { Request, Response } from 'express';
import {createOrder, getOrders} from '../services/orders.services';
import logger from '../util/logger.util';

/**
 * Create an order.
 * @param req - The request object.
 * @param res - The response object.
 */
export async function createOrders(req: Request, res: Response): Promise<void> {
  try {
    const order = await createOrder(req.body);
    res.status(201).send({order});
  } catch (error) {
    console.log(error)
    res.status(400).send({error});
    logger.error(error);
  }
}

/**
 * Get all orders.
 * @param req - The request object.
 * @param res - The response object.
 */
export async function getOrder(req: Request, res: Response): Promise<void> {
  try {
    const orders = await getOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
    logger.error(error);
  }
}
