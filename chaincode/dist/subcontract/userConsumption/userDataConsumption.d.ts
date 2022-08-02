export declare class UserConsumption {
    readonly type: string;
    walletId: string;
    podId: string;
    consumption: {
        "time": number;
        "consumption": number;
    }[];
    constructor(walletId: string, podId: string, consumption: {
        "time": number;
        "consumption": number;
    }[]);
}
