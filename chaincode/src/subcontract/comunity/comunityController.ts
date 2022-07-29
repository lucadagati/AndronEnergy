import { Context,Info,Transaction } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
import { PodCrudOperations } from "../pod/podController";
import { Status } from '../../utility/asset';

@Info({title:"operations for Comunity", description:"defines the operations for the comunity"})
export class ComunityController extends ContractExtension{
    constructor(){
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("comunity");
    }
    @Transaction(true)
    public async CreateComunity(ctx:Context,param:string):Promise<void>{
        const params = JSON.parse(param);
        for(const pod of params.pods){
            const exist = await this.get(ctx,'pod'+'-'+pod.Id);
            if(!exist)
                throw new Error("The pod with id:"+params.podId+" does not  exists");
            }
        const comunities =JSON.parse(await this.getAll(ctx));
        for(const comunity of comunities ){
            for(const pod in params.pods){
                if(comunity.pods.include(pod)){
                    throw new Error("The pod with id:"+params.podId+"is altready used");
                }
            }
        }
        const comunity={
            type:"comunity",
            comunityId:params.comunityId,
            podList:params.pods
        }
        await ctx.stub.putState(comunity.type+"-"+comunity.comunityId,Buffer.from(JSON.stringify(comunity)))
            .then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
    }

    @Transaction()
    public async getComunities(ctx:Context):Promise<void>{
        return JSON.parse(await this.getAll(ctx));
    }


    // DeleteAsset deletes an given asset from the world state.
    @Transaction()
    public async DeleteComunity(ctx: Context, id: string): Promise<Object> {
        const exists = await this.get(ctx,'comunity-'+ id);
        if (!exists) {
            throw new Error(`The comunity ${id} does not exist`);
        }
        return Promise.all([
        await ctx.stub.deleteState('comunity-'+id)
        ]).then(()=>{return {status: Status.Success , message:"Operazione effettuata"}})
    }

    @Transaction()
    public async addPodToComunity(ctx:Context,podId:string,comunityId:string):Promise<Object> {
        const pod=new PodCrudOperations();
        const comunity:any=await this.get(ctx,comunityId);
        const exist=await pod.get(ctx,podId);
        let podList=comunity.podList.filter((elem:String)=>elem==podId)
        if(podList.length!=0){
            throw new Error(`The pod ${podId}  altready exist in the comunity`);
        }
        if(!exist){
            throw new Error(`The pod ${podId}  does not exist`);
        }
        comunity.podList=[...comunity.podList,podId];
        return Promise.all([
            await ctx.stub.putState('comunity-'+comunity.comunityId,Buffer.from(JSON.stringify(comunity)))
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});        
    }

    @Transaction()
    public async DeletePodFromComunity(ctx:Context,podId:string,comunityId:string):Promise<Object>{
        const pod=new PodCrudOperations();
        const exist=await pod.get(ctx,podId);
        const comunity:any=await this.get(ctx,comunityId);
        let podList=comunity.podList.filter((elem:String)=>elem==podId)
        if(!exist || podList.length===0){
            throw new Error(`The pod ${podId}  does not exist in the comunity`);
        }
        comunity.podList=comunity.podList.filter((elem:String)=>elem!=podId)
        return Promise.all([
            await ctx.stub.putState('comunity-'+comunity.comunityId,Buffer.from(JSON.stringify(comunity)))
           ]).then(()=> {return {status: Status.Success , message:"Operazione effettuata"}});
   
        
    }

}
