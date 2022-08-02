import {Object,Property} from 'fabric-contract-api';


@Object()
export class UserConsumption{
    @Property()
    public readonly type: string = "userConsumption"
    @Property()
    public walletId:string;
    @Property()
    public podId:string;
    @Property()
    public consumption:{"time":number,"consumption":number}[];
    
    constructor(walletId:string,podId:string,consumption:{"time":number,"consumption":number}[]){
        this.podId=podId;
        this.walletId=walletId;
        this.consumption=consumption;
    }
}