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
const podController_1 = require("./../pod/podController");
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
        let exist = await this.get(ctx, params.userConsumptionId);
        if (exist) {
            throw new Error("The user with  id:" + params.userConsumptionId + " already exists");
        }
        const consumption = {
            userConsumptionId: params.userConsumptionId,
            podId: params.podId,
            comunityId: params.comunityId,
            consumption: [{ "time": 0, "consumption": 0 }],
            type: 'userConsumption',
        };
        return Promise.all([
            await ctx.stub.putState(consumption.type + "-" + consumption.userConsumptionId, Buffer.from(JSON.stringify(consumption)))
        ])
            .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async AddConsumption(ctx, id, param) {
        const params = JSON.parse(param);
        const pod_exist = await this.get(ctx, 'pod' + '-' + params.podId);
        const exist = await this.get(ctx, id);
        if (exist.userConsumptionId == undefined) {
            throw new Error("The user with wallet id:" + id + " does not exists");
        }
        if (!pod_exist) {
            throw new Error("The pod with id:" + id + " does not exists");
        }
        const consumption = {
            userConsumptionId: id,
            podId: params.podId,
            consumption: [...exist.consumption, { "time": params.time, "consumption": params.consumption }],
            type: 'userConsumption',
        };
        return Promise.all([await ctx.stub.putState(consumption.type + "-" + consumption.userConsumptionId, Buffer.from(JSON.stringify(consumption)))])
            .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async updateUserConsumptionPod(ctx, param) {
        const params = JSON.parse(param);
        const podClass = new podController_1.PodCrudOperations();
        let exist = await this.get(ctx, params.userConsumptionId);
        let podExist = podClass.get(ctx, params.podId);
        if (!exist) {
            throw new Error("The user with  id:" + params.userConsumptionId + " does not exists");
        }
        else if (!podExist) {
            throw new Error("The pod with  id:" + params.podId + " does not exists");
        }
        else {
            exist.podId = params.podId;
            const obj = { userConsumptionId: params.userConsumptionId };
            podClass.podUpdateUsers(ctx, JSON.stringify(obj));
            return Promise.all([await ctx.stub.putState('userConsumption-' + exist.userConsumptionId, Buffer.from(JSON.stringify(exist)))])
                .then(() => { return { status: asset_1.Status.Success, message: "Operazione effetuata" }; });
        }
    }
    async deletePodFromUser(ctx, param) {
        const params = JSON.parse(param);
        const podClass = new podController_1.PodCrudOperations();
        const pod = await podClass.get(ctx, params.podId);
        let exist = await this.get(ctx, params.userConsumptionId);
        if (!exist) {
            throw new Error("The user with  id:" + params.userConsumptionId + " does not exists");
        }
        else if (!pod) {
            throw new Error("The pod with  id:" + params.userConsumptionId + " does not exists");
        }
        else {
            if (exist.podId === params.podId) {
                exist.podId = "";
                const obj = { userConsumptionId: params.userConsumptionId };
                podClass.podDeleteUsers(ctx, JSON.stringify(obj));
                return Promise.all([await ctx.stub.putState('userConsumption-' + exist.userConsumptionId, Buffer.from(JSON.stringify(exist)))])
                    .then(() => { return { status: asset_1.Status.Success, message: "Operazione effetuata" }; });
            }
            else {
                throw new Error("The pod with is not attached to the user");
            }
        }
    }
    async deletePodFromUsers(ctx, podId) {
        let exist = JSON.parse(await this.getAll(ctx));
        for (const user of exist) {
            if (user.podId === podId) {
                user.podId = "";
                await ctx.stub.putState('userConsumption-' + user.userConsumptionId, Buffer.from(JSON.stringify(user)));
            }
        }
    }
    async deleteUsers(ctx, param) {
        const params = JSON.parse(param);
        const exists = await this.get(ctx, params.userConsumptionId);
        if (!exists) {
            throw new Error(`The user ${params.userConsumptionid} does not exist`);
        }
        return Promise.all([
            await ctx.stub.deleteState('userConsumption-' + params.userConsumptionId)
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
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
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserConsumptionsOperations.prototype, "updateUserConsumptionPod", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserConsumptionsOperations.prototype, "deletePodFromUser", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserConsumptionsOperations.prototype, "deletePodFromUsers", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserConsumptionsOperations.prototype, "deleteUsers", null);
UserConsumptionsOperations = __decorate([
    fabric_contract_api_1.Info({ title: "crud for the plant ", description: "Operation of update create for the plant " }),
    __metadata("design:paramtypes", [])
], UserConsumptionsOperations);
exports.UserConsumptionsOperations = UserConsumptionsOperations;
//# sourceMappingURL=userConsumptionController.js.map