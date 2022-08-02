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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConsumptionsOperations = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const contractExtension_1 = require("../../utility/contractExtension");
const asset_1 = require("../../utility/asset");
let UserConsumptionsOperations = class UserConsumptionsOperations extends contractExtension_1.ContractExtension {
    constructor() {
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("userConsumption");
    }
    async GenerateConsumption(ctx, param) {
        const params = JSON.parse(param);
        const consumption = {
            type: 'userConsumption',
            walletId: params.walletId,
            podId: params.podId,
            consumption: [{ "time": 0, "consumption": 0 }],
        };
        return Promise.all([
            await ctx.stub.putState(consumption.type + "-" + consumption.walletId, Buffer.from(JSON.stringify(consumption)))
        ])
            .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async AddConsumption(ctx, id, param) {
        const params = JSON.parse(param);
        const pod_exist = await this.get(ctx, 'pod' + '-' + params.podId);
        const exist = await this.get(ctx, id);
        if (exist.walletId == undefined) {
            throw new Error("The user with wallet id:" + id + " does not exists");
        }
        if (!pod_exist) {
            throw new Error("The pod with id:" + id + " does not exists");
        }
        const consumption = {
            type: 'userConsumption',
            podId: params.podId,
            walletId: id,
            consumption: [...exist.consumption, { "time": params.time, "consumption": params.consumption }],
        };
        return Promise.all([await ctx.stub.putState(consumption.type + "-" + consumption.walletId, Buffer.from(JSON.stringify(consumption)))])
            .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
};
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserConsumptionsOperations.prototype, "GenerateConsumption", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], UserConsumptionsOperations.prototype, "AddConsumption", null);
UserConsumptionsOperations = __decorate([
    fabric_contract_api_1.Info({ title: "crud for the plant ", description: "Operation of update create for the plant " }),
    __metadata("design:paramtypes", [])
], UserConsumptionsOperations);
exports.UserConsumptionsOperations = UserConsumptionsOperations;
//# sourceMappingURL=userConsumptionController.js.map