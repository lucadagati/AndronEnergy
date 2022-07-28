import { Context,Info,Returns,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
import { Status } from '../../utility/asset';

@Info({title:"crud for the plant ", description:"Operation of update create for the plant "})
export class UserConsumptionsOperations extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("userConsumption");
    }
@Transaction(true)
public async GenerateConsumption(ctx:Context,param:string):Promise<Object>{
    const params = JSON.parse(param);
    const consumption= {
        type:'userConsumption',
        walletId:params.walletId,
        consumption:[{"time":0,"consumption":0}],
        };
    return  Promise.all([await ctx.stub.putState(consumption.type+"-"+consumption.walletId,Buffer.from(JSON.stringify(consumption)))])
        .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }

@Transaction(true)
public async AddConsumption(ctx:Context,id:string,param:string):Promise<Object>{
    const params = JSON.parse(param);
    const exist:any=await this.get(ctx,id);
    if(exist.walletId==undefined){
        throw new Error("The user with wallet id:"+id+" does not exists");
    }
    const consumption= {
            type:'userConsumption',
            walletId:id,
            consumption:[...exist.consumption,{"time":params.time,"consumption":params.consumption}],
            };
    return  Promise.all([await ctx.stub.putState(consumption.type+"-"+consumption.walletId,Buffer.from(JSON.stringify(consumption)))])
        .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }


}