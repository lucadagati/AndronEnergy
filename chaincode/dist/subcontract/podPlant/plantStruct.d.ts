export declare class PlantStruct {
    readonly type: string;
    plantId: string;
    generatedEnergy: {
        "time": number;
        "consumption": number;
    }[];
    constructor(plantId: string, generatedEnergy: {
        "time": number;
        "consumption": number;
    }[]);
}
