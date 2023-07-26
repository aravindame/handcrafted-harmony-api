import { Request, Response } from 'express';
export declare function createProducts(req: Request, res: Response): Promise<void>;
export declare function getProduct(req: Request, res: Response): Promise<void>;
export declare function getProductsById(req: Request, res: Response): Promise<void>;
export declare function deleteProducts(req: Request, res: Response): Promise<void>;
export declare function updateProductsById(req: Request, res: Response): Promise<void>;
