import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class PlantOperations extends ContractExtension {
    constructor();
    CreatePlant(ctx: Context, param: string): Promise<Object>;
    updateGeneratedEnergy(ctx: Context, id: string, param: string): Promise<Object>;
}
