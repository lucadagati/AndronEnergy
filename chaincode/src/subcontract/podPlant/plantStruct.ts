import {Object,Property} from 'fabric-contract-api';

@Object()
export class PlantStruct{
    @Property()
    public readonly type: string = "plant"
    @Property()
    public plantId:string;
    @Property()
    public podId:string;
    @Property()
    public generatedEnergy:{"time":number,"consumption":number}[];
    
    constructor(plantId:string,podId:string,generatedEnergy:{"time":number,"consumption":number}[]){
        this.podId=podId;
        this.plantId=plantId;
        this.generatedEnergy=generatedEnergy;
    }
}