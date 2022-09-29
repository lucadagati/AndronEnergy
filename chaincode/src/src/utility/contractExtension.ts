import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';


export abstract class ContractExtension extends Contract{
    

    constructor(name:string){
        super(name)
    }
    @Transaction(false)
    @Returns('string')
    public async getAll(ctx: Context): Promise<string> {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();

        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.type==this.getName()){
                allResults.push(record);
            }
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    @Transaction(false)
    public async get(ctx: Context, assetID:string): Promise<Object> {
        return await this.getAsset(ctx, this.getName(), assetID)
    }

    protected async getAsset(ctx: Context, type:string, assetID:string): Promise<Object> {
        console.log(`${type}-${assetID}`)
        let asset = Buffer.from(await ctx.stub.getState(`${type}-${assetID}`)).toString('utf8')
        let record = JSON.parse(asset.length==0 ? "{}" : asset)
        if(record.type==type){
            return record
        }
        return {};
    }
}