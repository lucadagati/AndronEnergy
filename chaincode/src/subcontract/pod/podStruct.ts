import {Object,Property} from 'fabric-contract-api';


@Object()
export class PodStruct{
    @Property()
    public readonly type: string = "pod"
    @Property()
    public podId:string;
    @Property()
    public exchangedEnergy:{"time":number,"energy":number}[];
    @Property()
    public storedEnergy:{"time":number,"energy":number}[];
    @Property()
    public  offgrid:string;
    constructor(podId:string,exchangedEnergy:{"time":number,"energy":number}[],storedEnergy:{"time":number,"energy":number}[],offgrid:string){
        this.podId=podId;
        this.offgrid=offgrid;
        this.exchangedEnergy=exchangedEnergy;
        this.storedEnergy=storedEnergy;
    }

}