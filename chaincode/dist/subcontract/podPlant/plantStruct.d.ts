export declare class PlantStruct {
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
