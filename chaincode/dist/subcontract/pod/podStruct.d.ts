export declare class PodStruct {
    readonly type: string;
    podId: string;
    exchangedEnergy: {
        "time": number;
        "exchangedEnergy": number;
    }[];
    storedEnergy: {
        "time": number;
        "storedEnergy": number;
    }[];
    offgrid: string;
    constructor(podId: string, exchangedEnergy: {
        "time": number;
        "exchangedEnergy": number;
    }[], storedEnergy: {
        "time": number;
        "storedEnergy": number;
    }[], offgrid: string);
}
