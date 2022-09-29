import {Object,Property} from 'fabric-contract-api';

@Object()
export class PlantStruct{
    @Property()
    public readonly type: string = "plant";
    @Property()
    public readonly podId: string;
    @Property()
    public plantId:string;

    @Property()
    public generatedEnergy:{"time":number,"consumption":number}[];
    
    constructor(plantId:string,podId:string,generatedEnergy:{"time":number,"consumption":number}[]){
        this.plantId=plantId;
        this.podId=podId;
        this.generatedEnergy=generatedEnergy;
    }
}