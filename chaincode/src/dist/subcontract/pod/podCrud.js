"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodCrudOperations = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
const contractExtension_1 = require("../../utility/contractExtension");
let PodCrudOperations = class PodCrudOperations extends contractExtension_1.ContractExtension {
    constructor() {
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("pod");
    }
    async InitLedger(ctx) {
        const pod = [
            {
                type: "PodData",
                podId: "Pod1",
                exchangedEnergy: [{ "time": 0, "consumption": 0 }],
                storedEnergy: [{ "time": 0, "consumption": 0 }],
                offgrid: ''
            },
            { type: "PodData",
                podId: "Pod2",
                exchangedEnergy: [{ "time": 0, "consumption": 0 }],
                storedEnergy: [{ "time": 0, "consumption": 0 }],
                offgrid: '' },
            { type: "PodData",
                podId: "Pod3",
                exchangedEnergy: [{ "time": 0, "consumption": 0 }],
                storedEnergy: [{ "time": 0, "consumption": 0 }],
                offgrid: '' }
        ];
        for (const asset of pod) {
            asset.docType = 'asset';
            await ctx.stub.putState(asset.podId, Buffer.from(JSON.stringify(sort_keys_recursive_1.default(asset))));
            console.info(`Asset ${asset.podId} initialized`);
        }
    }
    async CreatePod(ctx, param) {
        const params = JSON.parse(param);
        const exist = await this.podExist(ctx, params.podId);
        if (exist) {
            throw new Error("The pod  with id:" + params.podId + " already exists");
        }
        //const pod=new PodStruct(params.podId,[{}],[{}],'');
        /*const pod={
            podId:params.podId,
            exchangedEnergy:[{}],
            storedEnergy:[{}],
            offgrid:''
        }*/
        //await ctx.stub.putState(params.podId,Buffer.from(JSON.stringify(sortKeysRecursive(pod))))
        //.then(()=> {return {status: Status.Success , message:"Operazione effettuata"}})
        ;
    }
    async podExist(ctx, id) {
        const AssetJSON = await ctx.stub.getState(id.toString());
        return AssetJSON && AssetJSON.length > 0;
    }
};
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "InitLedger", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "CreatePod", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "podExist", null);
PodCrudOperations = __decorate([
    fabric_contract_api_1.Info({ title: "crud for the pod ", description: "Operation of update create for the pod " }),
    __metadata("design:paramtypes", [])
], PodCrudOperations);
exports.PodCrudOperations = PodCrudOperations;
//# sourceMappingURL=podCrud.js.map