export declare function getConfig(): Promise<{
    default: {
        "api-prefix": string;
        cors: {
            origin: string[];
            optionsSuccessStatus: number;
        };
        rateLimit: {
            windowMs: number;
            max: number;
        };
        logger: {
            level: string;
            label: string;
            timestamp: {
                format: string;
            };
            levelInfo: {
                level: string;
                filename: string;
            };
            levelError: {
                level: string;
                filename: string;
            };
        };
    };
    "api-prefix": string;
    cors: {
        origin: string[];
        optionsSuccessStatus: number;
    };
    rateLimit: {
        windowMs: number;
        max: number;
    };
    logger: {
        level: string;
        label: string;
        timestamp: {
            format: string;
        };
        levelInfo: {
            level: string;
            filename: string;
        };
        levelError: {
            level: string;
            filename: string;
        };
    };
}>;
