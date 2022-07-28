export declare class PodStruct {
    readonly type: string;
    podId: string;
    exchangedEnergy: {
        "time": number;
        "energy": number;
    }[];
    storedEnergy: {
        "time": number;
        "energy": number;
    }[];
    offgrid: string;
    constructor(podId: string, exchangedEnergy: {
        "time": number;
        "energy": number;
    }[], storedEnergy: {
        "time": number;
        "energy": number;
    }[], offgrid: string);
}
