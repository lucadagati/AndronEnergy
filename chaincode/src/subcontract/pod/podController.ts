import { PlantOperations } from './../podPlant/plantCrontroller';
import { UserConsumptionsOperations } from './../userConsumption/userConsumptionController';
import { Status } from '../../utility/asset';
import { Context,Info,Transaction } from "fabric-contract-api";
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
            podId:"Pod1",
            plantIds:["Plant2"],
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            type:"pod",
            offgrid:'' },

            {
            podId:"Pod2",
            plantIds:["Plant3","Plant1"],
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            type:"pod",
            offgrid:'' },

            {
            podId:"Pod3",
            plantIds:["Plant1"],
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            type:"pod",
            offgrid:'' },
            {
            podId:"Pod4",
            plantIds:["Plant1","Plant2"],
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            type:"pod",
            offgrid:'' }
        ];
       // const Comunity=new ComunityController(); 
       // const plant=new PlantOperations();

        const comunity={
            comunityId:"Comunity1",
            podList:['Pod1','Pod2','Pod3','Pod4'],
            type:"comunity",
            }
        const plant1={
            plantId:"Plant1",
            generatedEnergy:[{"time":0,"generatedEnergy":0}],
            type:"plant",
        }
        const plant2={
            plantId:"Plant2",
            generatedEnergy:[{"time":0,"generatedEnergy":0}],
            type:"plant"
        }
        const plant3={
            plantId:"Plant3",
            generatedEnergy:[{"time":0,"generatedEnergy":0}],
            type:"plant"
        }

        const user1={
            userConsumptionId:"User1",
            podId:"Pod1",
            consumption:[{"time":0,"EnergyConsumption":0}],
            type:"userConsumption"
        }
        const user2={
            userConsumptionId:"User2",
            podId:"Pod1",
            consumption:[{"time":0,"EnergyConsumption":0}],
            type:"userConsumption",
        }
        for (const asset of pod){
            await ctx.stub.putState('pod'+'-'+asset.podId, Buffer.from(JSON.stringify(asset)))
            .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
            console.log(`Asset ${asset.podId} initialized`);
        }
        //await Comunity.CreateComunity(ctx,`{type:"comunity",comunityId:"Comunity1",podList:['Pod1','Pod2','Pod3']}`)
        await ctx.stub.putState('comunity-'+comunity.comunityId,Buffer.from(JSON.stringify(comunity)))
        await ctx.stub.putState('plant-'+plant1.plantId,Buffer.from(JSON.stringify(plant1)));
        await ctx.stub.putState('plant-'+plant2.plantId,Buffer.from(JSON.stringify(plant2)));
        await ctx.stub.putState('plant-'+plant3.plantId,Buffer.from(JSON.stringify(plant3)));
        await ctx.stub.putState('userConsumption-'+user1.userConsumptionId,Buffer.from(JSON.stringify(user1)));
        await ctx.stub.putState('userConsumption-'+user2.userConsumptionId,Buffer.from(JSON.stringify(user2)));

    }

    @Transaction(true)
    public async CreatePod(ctx:Context,param:string):Promise<Object>{
        const comunityClass=new ComunityController();
        const plantClass=new PlantOperations();
        const params = JSON.parse(param);
        const pod_exist = await this.get(ctx,params.podId)as PodStruct;
        const comunity_exist:any=await comunityClass.get(ctx,params.comunityId);
        const plant_exist:any=await plantClass.get(ctx,params.plantId);
        if(pod_exist.podId!=undefined){
            throw new Error("The pod  with id:"+pod_exist.podId+" already exists");
            }
        if(!comunity_exist){
            throw new Error("The comunity  with id:"+comunity_exist.comunityId+" does not exists");
        }
        if(!plant_exist){
            throw new Error("The plant with id: " + plant_exist.plantId+" does not exist");
        }
        const pod:PodStruct={
            type:"pod",
            podId:params.podId,
            plantIds:[],
            exchangedEnergy:[{"time":0,"exchangedEnergy":0}],
            storedEnergy:[{"time":0,"storedEnergy":0}],
            offgrid:'' ,
        };
        return Promise.all([
        await ctx.stub.putState('pod'+'-'+pod.podId, Buffer.from(JSON.stringify(pod))),
        await comunityClass.addPodToComunity(ctx,params.podId,params.comunityId),
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
            podId:id,
            exchangedEnergy:exchangedEnergy,
            storedEnergy:storedEnergy,
            type:'pod',
            offgrid:offgrid,
        };
        return pod;
    }
    @Transaction()
    public async DeletePod(ctx: Context, param: string): Promise<Object> {
        const params = JSON.parse(param);
        const comunityClass=new ComunityController();
        const userClass= new UserConsumptionsOperations()
        const exists= await this.get(ctx, params.podId);
        const comunities:any=JSON.parse(await comunityClass.getAll(ctx));
        if (!exists) {
            throw new Error(`The pod ${params.podId} does not exist`);
        }
        //const comunities=comunity.getComunities();
        for(const comunity of comunities){
             let pods=comunity.podList;
             if (pods.includes(params.podId)===true){
                await comunityClass.DeletePodFromComunity(ctx,params.podId,comunity.comunityId);
            }
        }
        return Promise.all([
            userClass.deletePodFromUsers(ctx,params.podId),
            await ctx.stub.deleteState('pod-'+params.podId)
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    
   
    }

    @Transaction()
    public async podUpdatePlant(ctx:Context,param:string): Promise<Object> {
        const params=JSON.parse(param);
        const plantClass=new PlantOperations();
        const exist:any=await this.get(ctx,params.podId);
        const plant:any=await plantClass.get(ctx,params.plantId);
        if(!plant){
            throw new Error(`The plant ${plant.plantId} does not exist`);
        }
        else if(!exist){
            throw new Error(`The pod ${exist.podId} does not exist`);
        }
        else{
            if(exist.plantIds.indexOf(params.plantId)!==-1)
                return {status:Status.Success,message:"Operazione effetuata"}
            else{
                exist.plantIds=exist.plantIds.concat(params.plantId);
                return Promise.all([await ctx.stub.putState('pod-'+exist.podId,Buffer.from(JSON.stringify(exist)))])
                .then(()=>{return {status:Status.Success,message:"Operazione effetuata"}});
                }
            }

    }


    @Transaction()
    public async removePlantfromPod(ctx:Context,param:string):Promise<Object>{
        const params=JSON.parse(param);
        const plantClass=new PlantOperations();
        const plant:any=await plantClass.get(ctx,params.plantId);
        const exist:any=await this.get(ctx,params.podId);
        if (!exist) {
                throw new Error(`The pod ${exist.plantIds} does not exist`);
            }
        else if(!plant){
            throw new Error(`The plant ${exist.podId} does not exist`);
        }
        else{
            exist.plantIds=exist.plantIds.filter((elem:String)=>elem!==params.plantId);
            return Promise.all([await ctx.stub.putState('pod-'+exist.podId,Buffer.from(JSON.stringify(exist)))])
                .then(()=>{return {status:Status.Success,message:"Operazione effetuata"}});
            }
        }


    @Transaction()
    public async removePlantfromPods(ctx:Context,pods:string[],plantId:string):Promise<void>{

        for(let i=0;i< pods.length; i++ ){
            var exists:any= await this.get(ctx, pods[i]);
            if (!exists) {
                throw new Error(`The pod ${pods[i]} does not exist`);
            }
            else{
                 exists.plantIds=exists.plantIds.filter((elem:string)=>elem!==plantId);
                 await ctx.stub.putState('pod-'+exists.podId,Buffer.from(JSON.stringify(exists)))
            }
        }

    }

}
