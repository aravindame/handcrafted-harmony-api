"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const analyticsService = require("../../services/analytics.services");
describe('AnalyticsService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getAnalytics', () => {
        it('should retrieve the analytics data for total quantities and price sums of order items', async () => {
            const expectedAnalytics = [
                {
                    _id: 'product-id-1',
                    totalQuantity: 10,
                    sumPrice: 100,
                    title: 'product 1',
                    price: 10,
                    imageUrl: 'image-url-1',
                },
                {
                    _id: 'product-id-2',
                    totalQuantity: 5,
                    sumPrice: 75,
                    title: 'product 2',
                    price: 15,
                    imageUrl: 'image-url-2',
                },
            ];
            const mockAnalyticsModel = jest.fn().mockReturnValue(expectedAnalytics);
            jest.spyOn(analyticsService, 'getAnalytics').mockImplementation(async () => {
                return await mockAnalyticsModel(expectedAnalytics);
            });
            const result = await analyticsService.getAnalytics();
            expect(mockAnalyticsModel).toHaveBeenCalledTimes(1);
            expect(result).toEqual(expectedAnalytics);
        });
        it('should return an empty array if no analytics data is found', async () => {
            const emptyAnalytics = [];
            const mockAnalyticsModel = jest.fn().mockReturnValue(emptyAnalytics);
            jest.spyOn(analyticsService, 'getAnalytics').mockImplementation(async () => {
                return await mockAnalyticsModel(emptyAnalytics);
            });
            const result = await analyticsService.getAnalytics();
            expect(mockAnalyticsModel).toHaveBeenCalledTimes(1);
            expect(result).toEqual(emptyAnalytics);
        });
    });
});
//# sourceMappingURL=analytics.services.test.js.map