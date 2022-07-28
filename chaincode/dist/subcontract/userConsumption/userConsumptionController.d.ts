import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class UserConsumptionsOperations extends ContractExtension {
    constructor();
    GenerateConsumption(ctx: Context, param: string): Promise<Object>;
    AddConsumption(ctx: Context, id: string, param: string): Promise<Object>;
}
