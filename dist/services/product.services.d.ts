import { IProduct } from "../types/products.interface";
export declare function getProducts(): Promise<IProduct[]>;
export declare function createProduct(productData: IProduct): Promise<IProduct>;
export declare function getProductById(itemId: string): Promise<IProduct | null>;
export declare function updateProductById(itemId: string, updateData: any): Promise<IProduct | null>;
export declare function deleteProduct(itemId: string): Promise<IProduct | null>;
