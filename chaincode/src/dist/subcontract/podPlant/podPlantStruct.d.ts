export declare class PodPlantStruct {
    readonly type: string;
    plantId: string;
    podId: string;
    generatedEnergy: {
        "time": number;
        "consumption": number;
    }[];
    constructor(plantId: string, podId: string, generatedEnergy: {
        "time": number;
        "consumption": number;
    }[]);
}
