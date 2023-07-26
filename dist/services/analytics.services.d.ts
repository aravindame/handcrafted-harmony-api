export interface ITotalQuantity {
    id: string;
    totalQuantity: number;
    sumPrice: number;
    title: string;
    price: number;
    imageUrl: string;
}
export declare function getAnalytics(): Promise<ITotalQuantity[]>;
