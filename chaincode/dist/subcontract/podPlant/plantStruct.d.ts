export declare class PlantStruct {
    readonly type: string;
    plantId: string;
    podId: [];
    generatedEnergy: {
        "time": number;
        "consumption": number;
    }[];
    constructor(plantId: string, podId: [], generatedEnergy: {
        "time": number;
        "consumption": number;
    }[]);
}
