export declare class PlantStruct {
    readonly type: string;
    readonly podId: string;
    plantId: string;
    generatedEnergy: {
        "time": number;
        "consumption": number;
    }[];
    constructor(plantId: string, podId: string, generatedEnergy: {
        "time": number;
        "consumption": number;
    }[]);
}
