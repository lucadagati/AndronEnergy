import { PodStruct } from '../pod/podStruct';
import { Context,Info,Returns,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
import { PlantStruct } from "./plantStruct";
import { Status } from '../../utility/asset';

@Info({title:"crud for the plant ", description:"Operation of update create for the plant "})

export class PlantOperations extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("plant");
    }
    @Transaction(true)
    public async CreatePlant(ctx:Context,param:string):Promise<Object>{
        const params = JSON.parse(param);
        const exist:any = await this.get(ctx,params.plantId);
        if(exist.plantId){
            throw new Error("The palnt with id:"+params.podId+" already exists");
            }
        const plant= {
            type:'plant',
            plantId:params.plantId,
            podId:[],
            generatedEnergy:[{"time":0,"consumption":0}],
            };
        return  Promise.all([await ctx.stub.putState(plant.type+"-"+plant.plantId,Buffer.from(JSON.stringify(plant)))])
            .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }





    @Transaction()
    public async updateGeneratedEnergy(ctx:Context,id:string,param:string): Promise<Object> {
        const params =JSON.parse(param);

        const plant:any = await this.get(ctx,id)as PlantStruct;
        if(plant.plantId==undefined){
            throw new Error("The plant  with id:"+plant.plantId+" does not exists");
        }
        plant.generatedEnergy.push({"time":params.time,"consumption":params.consumption})

        return Promise.all([ await ctx.stub.putState(plant.type+"-"+plant.plantId,Buffer.from(JSON.stringify(plant)))])
            .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});

    }

}
