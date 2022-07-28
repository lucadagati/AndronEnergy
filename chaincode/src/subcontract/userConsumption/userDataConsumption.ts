import {Object,Property} from 'fabric-contract-api';


@Object()
export class UserConsumption{
    @Property()
    public readonly type: string = "userConsumption"
    @Property()
    public walletId:string;
    @Property()
    public consumption:{"time":number,"consumption":number}[];

}