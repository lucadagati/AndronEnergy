import {Object,Property} from 'fabric-contract-api';


@Object()
export class PodStruct{
    @Property()
    public readonly type: string = "pod"
    @Property()
    public podId:string;
    @Property()
    public comunityId:string;
    @Property()
    public plantIds:string[];
    @Property()
    public userConsumptionIds:string[];
    @Property()
    public exchangedEnergy:{"time":number,"exchangedEnergy":number}[];
    @Property()
    public storedEnergy:{"time":number,"storedEnergy":number}[];
    @Property()
    public  offgrid:string;
    constructor(podId:string,userConsumptionId:string[],plantIds:string[],exchangedEnergy:{"time":number,"exchangedEnergy":number}[],storedEnergy:{"time":number,"storedEnergy":number}[],offgrid:string,comunityId:string){
        this.podId=podId;
        this.plantIds=plantIds;
        this.offgrid=offgrid;
        this.exchangedEnergy=exchangedEnergy;
        this.storedEnergy=storedEnergy;
        this.comunityId=comunityId;
        this.userConsumptionIds=userConsumptionId;
    }

}