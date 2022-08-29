import { Context,Info,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
import { PlantStruct } from "./plantStruct";
import { Status } from '../../utility/asset';
import { PodCrudOperations } from "../pod/podController";

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
            throw new Error("The plant with id:"+params.plantId+" already exists");
            }
        const plant= {
            plantId:params.plantId,
            generatedEnergy:[{"time":0,"consumption":0}],
            type:'plant',
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

    @Transaction()
    public async DeletePlant(ctx: Context, param: string): Promise<Object> {
       // const comunityClass=new ComunityController();
       const params=JSON.parse(param)
       const podClass=new PodCrudOperations()
        const exists= await this.get(ctx, params.plantId);
        const pods:any=JSON.parse(await podClass.getAll(ctx));
        if (!exists) {
            throw new Error(`The plant ${params.plantId} does not exist`);
        }

        //const comunities=comunity.getComunities();
        let res:any=[];
        for(const pod of pods){
             let plants=pod.plantIds;
             if (plants.includes(params.plantId)){
                res=res.concat(pod.podId);
            }
        }
        return Promise.all([
            //comunityClass.DeletePodFromComunity(ctx,id,res.comunityId),
            await podClass.removePlantfromPods(ctx,res,params.plantId),
            await ctx.stub.deleteState('plant-'+params.plantId)
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
        }

}
