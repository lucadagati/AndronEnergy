export declare class UserConsumption {
    readonly type: string;
    userConsumptionId: string;
    comunityId: string;
    podId: string;
    consumption: {
        "time": number;
        "consumption": number;
    }[];
    constructor(userConsumptionId: string, podId: string, comunityId: string, consumption: {
        "time": number;
        "consumption": number;
    }[]);
}
