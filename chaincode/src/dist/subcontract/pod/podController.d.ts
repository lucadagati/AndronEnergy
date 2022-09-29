import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class PodCrudOperations extends ContractExtension {
    constructor();
    InitLedger(ctx: Context): Promise<void>;
    CreatePod(ctx: Context, param: string): Promise<Object>;
    updateExchangedEnergy(ctx: Context, id: string, param: string): Promise<Object>;
    updateStoredEnergy(ctx: Context, id: string, param: string): Promise<Object>;
    updateOffGrid(ctx: Context, id: string, param: string): Promise<Object>;
    private generatePodObj;
    DeletePod(ctx: Context, param: string): Promise<Object>;
    podUpdatePlant(ctx: Context, param: string): Promise<Object>;
    removePlantfromPod(ctx: Context, param: string): Promise<Object>;
    removePlantfromPods(ctx: Context, pods: string[], plantId: string): Promise<void>;
    podUpdateUsers(ctx: Context, param: string): Promise<Object>;
    podDeleteUsers(ctx: Context, param: string): Promise<Object>;
    podUpdateComunity(ctx: Context, param: string): Promise<Object>;
    podRemoveComunity(ctx: Context, param: string): Promise<Object>;
}
