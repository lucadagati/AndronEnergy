import { PlantOperations } from './../podPlant/plantCrontroller';
import { Status } from '../../utility/asset';
import { Context,Info,Transaction } from "fabric-contract-api";
import sortKeysRecursive from "sort-keys-recursive";
import { PodStruct } from "./podStruct";
import { ContractExtension } from '../../utility/contractExtension';
import { ComunityController } from '../comunity/comunityController';

@Info({title:"crud for the pod ", description:"Operation of update create for the pod "})

export class PodCrudOperations extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("pod");
    }

    @Transaction(true)
    public async InitLedger(ctx:Context):Promise<void>{
        const pod:PodStruct[]=
        [
            {
            type:"pod",
            podId:"Pod1",
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            offgrid:'' },

            {type:"pod",
            podId:"Pod2",
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            offgrid:'' },

            {type:"pod",
            podId:"Pod3",
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            offgrid:'' },
            {type:"pod",
            podId:"Pod4",
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            offgrid:'' }
        ];
       // const Comunity=new ComunityController(); 
       // const plant=new PlantOperations();

        const comunity={
            type:"comunity",
            comunityId:"Comunity1",
            podList:['Pod1','Pod2','Pod3','Pod4'],
            }
        const plant1={
            type:"plant",
            plantId:"Plant1",
            podId:["Pod1","Pod2"],
            generatedEnergy:[{"time":0,"generatedEnergy":0}],
        }
        const plant2={
            type:"plant",
            plantId:"Plant2",
            podId:["Pod3","Pod4"],
            generatedEnergy:[{"time":0,"generatedEnergy":0}],
        }

        const user1={
            type:"userConsumption",
            walletId:"User1",
            podId:"Pod1",
            consumption:[{"time":0,"generatedEnergy":0}]
        }
        const user2={
            type:'userConsumption',
            walletId:"User2",
            podId:"Pod1",
            consumption:[{"time":0,"generatedEnergy":0}]
        }
        for (const asset of pod){
            await ctx.stub.putState('pod'+'-'+asset.podId, Buffer.from(JSON.stringify(sortKeysRecursive(asset))))
            .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
            console.log(`Asset ${asset.podId} initialized`);
        }
        //await Comunity.CreateComunity(ctx,`{type:"comunity",comunityId:"Comunity1",podList:['Pod1','Pod2','Pod3']}`)
        await ctx.stub.putState('comunity-'+comunity.comunityId,Buffer.from(JSON.stringify(sortKeysRecursive(comunity))))
        await ctx.stub.putState('plant-'+plant1.plantId,Buffer.from(JSON.stringify(sortKeysRecursive(plant1))));
        await ctx.stub.putState('plant-'+plant2.plantId,Buffer.from(JSON.stringify(sortKeysRecursive(plant2))));
        await ctx.stub.putState('userConsumption-'+user1.walletId,Buffer.from(JSON.stringify(sortKeysRecursive(user1))));
        await ctx.stub.putState('userConsumption-'+user2.walletId,Buffer.from(JSON.stringify(sortKeysRecursive(user2))));

    }

    @Transaction(true)
    public async CreatePod(ctx:Context,param:string):Promise<Object>{
        const comunityClass=new ComunityController();
        const params = JSON.parse(param);
        const pod_exist = await this.get(ctx,params.podId)as PodStruct;
        const comunity_exist:any=await comunityClass.get(ctx,params.comunityId);

        if(pod_exist.podId!=undefined){
            throw new Error("The pod  with id:"+pod_exist.podId+" already exists");
            }
        if(!comunity_exist){
            throw new Error("The comunity  with id:"+comunity_exist.comunityId+" does not exists");
        }
        const pod:PodStruct={
            type:"pod",
            podId:params.podId,
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            offgrid:'' ,
        };

        return Promise.all([
        await ctx.stub.putState('pod'+'-'+pod.podId, Buffer.from(JSON.stringify(sortKeysRecursive(pod)))),
        comunityClass.addPodToComunity(ctx,params.podId,params.comunityId)
        ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }


    @Transaction(true)
    public async updateExchangedEnergy(ctx:Context,id:string,param:string): Promise<Object> {
        const params =JSON.parse(param);
        const exist:any=await this.get(ctx,id);
        if(!exist){
            throw new Error("The pod  with id:"+params.podId+" does not exists");
            }
       /* const pod={
                type:'pod',
                podId:id,
                exchangedEnergy:[...exist.exchangedEnergy,{"time":params.time,"energy":params.storedEnergy}],
                storedEnergy:exist.storedEnergy,
                offgrid:exist.offgrid
            };*/
        const pod=this.generatePodObj(id,[...exist.exchangedEnergy,{"time":params.time,"exchangedEnergy":params.storedEnergy}],exist.storedEnergy,exist.offgrid)

        //exist.exchangedEnergy=exist.exchangedEnergy.push(params.exchangedEnergy)
        return Promise.all([
            await ctx.stub.putState('pod-'+exist.podId,Buffer.from(JSON.stringify(pod)))
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
   
    }


    @Transaction(true)
    public async updateStoredEnergy(ctx:Context,id:string,param:string): Promise<Object> {
        const params =JSON.parse(param);
        const exist:any=await this.get(ctx,id);
        if(exist.podId==undefined){
            throw new Error("The pod  with id:"+exist.podId+" does not exists");
            }
        /*const pod={
            type:'pod',
            podId:id,
            exchangedEnergy:exist.exchangedEnergy,
            storedEnergy:[...exist.storedEnergy,{"time":params.time,"energy":params.storedEnergy}],
            offgrid:exist.offgrid
        };*/
        const pod=this.generatePodObj(id,exist.exchangedEnergy,[...exist.storedEnergy,{"time":params.time,"storedEnergy":params.storedEnergy}],exist.offgrid)
        //exist.storedEnergy=exist.storedEnergy.push(params.storedEnergy)
        return Promise.all([
             await ctx.stub.putState('pod-'+exist.podId,Buffer.from(JSON.stringify(pod)))
            ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});;
    }


    @Transaction(true)
    public async updateOffGrid(ctx:Context,id:string,param:string): Promise<Object> {
        const params =JSON.parse(param);
        const exist:any=await this.get(ctx,id);
        if(!exist){
            throw new Error("The pod  with id:"+params.podId+" does not exists");
            }
        /*const pod={
            type:'pod',
            podId:id,
            exchangedEnergy:exist.exchangedEnergy,
            storedEnergy:exist.storedEnergy,
            offgrid:params.offgrid,
        };*/
        const pod=this.generatePodObj(id,exist.exchangedEnergy,exist.storedEnergy,params.offgrid)
        return Promise.all([
            await ctx.stub.putState('pod-'+exist.podId,Buffer.from(JSON.stringify(pod)))
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});;
        }    
    @Transaction(false)
    private generatePodObj(id:string,exchangedEnergy:{"time":number,"exchangedEnergy":number}[],storedEnergy:{"time":number,"storedEnergy":number}[],offgrid:string){
         const pod={
            type:'pod',
            podId:id,
            exchangedEnergy:exchangedEnergy,
            storedEnergy:storedEnergy,
            offgrid:offgrid,
        };
        return pod;
    }
    @Transaction()
    public async DeletePod(ctx: Context, id: string): Promise<Object> {
        const comunityClass=new ComunityController();
        const exists= await this.get(ctx, id);
        const comunities:any=JSON.parse(await comunityClass.getAll(ctx));
        if (!exists) {
            throw new Error(`The pod ${id} does not exist`);
        }
        //const comunities=comunity.getComunities();
        let res:any;
        for(const comunity of comunities){
             let pods=comunity.podList;
             if (pods.includes(id)){
                res=comunity;
                break;
            }
        }
        return Promise.all([
            comunityClass.DeletePodFromComunity(ctx,id,res.comunityId),
            await ctx.stub.deleteState('pod-'+id).then(()=>{return {status: Status.Success , message:"Operazione effettuata"}})
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    
   
    }

}
