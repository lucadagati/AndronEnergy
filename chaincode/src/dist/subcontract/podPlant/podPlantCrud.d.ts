import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class PlantOperations extends ContractExtension {
    constructor();
    CreatePlant(ctx: Context, param: string): Promise<void>;
}
