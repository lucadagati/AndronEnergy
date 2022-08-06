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
exports.PlantOperations = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const contractExtension_1 = require("../../utility/contractExtension");
const asset_1 = require("../../utility/asset");
let PlantOperations = class PlantOperations extends contractExtension_1.ContractExtension {
    constructor() {
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("plant");
    }
    async CreatePlant(ctx, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, params.plantId);
        if (exist.plantId) {
            throw new Error("The palnt with id:" + params.podId + " already exists");
        }
        const plant = {
            plantId: params.plantId,
            podId: [],
            generatedEnergy: [{ "time": 0, "consumption": 0 }],
            type: 'plant',
        };
        return Promise.all([await ctx.stub.putState(plant.type + "-" + plant.plantId, Buffer.from(JSON.stringify(plant)))])
            .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async updateGeneratedEnergy(ctx, id, param) {
        const params = JSON.parse(param);
        const plant = await this.get(ctx, id);
        if (plant.plantId == undefined) {
            throw new Error("The plant  with id:" + plant.plantId + " does not exists");
        }
        plant.generatedEnergy.push({ "time": params.time, "consumption": params.consumption });
        return Promise.all([await ctx.stub.putState(plant.type + "-" + plant.plantId, Buffer.from(JSON.stringify(plant)))])
            .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
};
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PlantOperations.prototype, "CreatePlant", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PlantOperations.prototype, "updateGeneratedEnergy", null);
PlantOperations = __decorate([
    fabric_contract_api_1.Info({ title: "crud for the plant ", description: "Operation of update create for the plant " }),
    __metadata("design:paramtypes", [])
], PlantOperations);
exports.PlantOperations = PlantOperations;
//# sourceMappingURL=plantCrontroller.js.map