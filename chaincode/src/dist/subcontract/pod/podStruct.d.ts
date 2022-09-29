export declare class PodStruct {
    readonly type: string;
    podId: string;
    comunityId: string;
    plantIds: string[];
    userConsumptionIds: string[];
    exchangedEnergy: {
        "time": number;
        "exchangedEnergy": number;
    }[];
    storedEnergy: {
        "time": number;
        "storedEnergy": number;
    }[];
    offgrid: string;
    constructor(podId: string, userConsumptionId: string[], plantIds: string[], exchangedEnergy: {
        "time": number;
        "exchangedEnergy": number;
    }[], storedEnergy: {
        "time": number;
        "storedEnergy": number;
    }[], offgrid: string, comunityId: string);
}
