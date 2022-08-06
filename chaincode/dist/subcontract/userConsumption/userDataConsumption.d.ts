export declare class UserConsumption {
    readonly type: string;
    userConsumptionId: string;
    podId: string;
    consumption: {
        "time": number;
        "consumption": number;
    }[];
    constructor(userConsumptionId: string, podId: string, consumption: {
        "time": number;
        "consumption": number;
    }[]);
}
