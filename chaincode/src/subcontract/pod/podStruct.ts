import {Object,Property} from 'fabric-contract-api';


@Object()
export class PodStruct{
    @Property()
    public readonly type: string = "pod"
    @Property()
    public podId:string;
    @Property()
    public exchangedEnergy:{"time":number,"exchangedEnergy":number}[];
    @Property()
    public storedEnergy:{"time":number,"storedEnergy":number}[];
    @Property()
    public  offgrid:string;
    constructor(podId:string,exchangedEnergy:{"time":number,"exchangedEnergy":number}[],storedEnergy:{"time":number,"storedEnergy":number}[],offgrid:string){
        this.podId=podId;
        this.offgrid=offgrid;
        this.exchangedEnergy=exchangedEnergy;
        this.storedEnergy=storedEnergy;
    }

}