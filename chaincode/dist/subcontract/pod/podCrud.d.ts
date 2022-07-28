import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class PodCrudOperations extends ContractExtension {
    constructor();
    InitLedger(ctx: Context): Promise<void>;
    CreatePod(ctx: Context, param: string): Promise<void>;
    podExist(ctx: Context, id: string): Promise<boolean>;
}
