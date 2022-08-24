import {Object,Property} from 'fabric-contract-api';

@Object()
export class PlantStruct{
    @Property()
    public readonly type: string = "plant"
    @Property()
    public plantId:string;

    @Property()
    public generatedEnergy:{"time":number,"consumption":number}[];
    
    constructor(plantId:string,generatedEnergy:{"time":number,"consumption":number}[]){
        this.plantId=plantId;
        this.generatedEnergy=generatedEnergy;
    }
}