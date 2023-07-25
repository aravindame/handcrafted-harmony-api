import { Request, Response } from 'express';
import logger from '../util/logger.util';
import { ITotalQuantity, getAnalytics} from '../services/analytics.services';

/**
 * Handles the request to retrieve analytics data.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves to void.
 */
export async function getAnalytic(req: Request, res: Response): Promise<void> {
  try {
    const analytics: ITotalQuantity[] = await getAnalytics();
    res.status(200).json(analytics);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to retrieve analytics' });
  }
}
