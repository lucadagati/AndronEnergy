import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class ComunityController extends ContractExtension {
    constructor();
    CreateComunity(ctx: Context, param: string): Promise<void>;
    getComunities(ctx: Context): Promise<void>;
    DeleteComunity(ctx: Context, param: string): Promise<Object>;
    addPodToComunity(ctx: Context, podId: string, comunityId: string): Promise<Object>;
    DeletePodFromComunity(ctx: Context, podId: string, comunityId: string): Promise<void>;
}
