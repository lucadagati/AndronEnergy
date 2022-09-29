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
exports.PlantOperations = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
const contractExtension_1 = require("../../utility/contractExtension");
const plantStruct_1 = require("./plantStruct");
const asset_1 = require("../../utility/asset");
let PlantOperations = class PlantOperations extends contractExtension_1.ContractExtension {
    constructor() {
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("plant");
    }
    async CreatePlant(ctx, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, params.plantId);
        if (exist) {
            throw new Error("The palnt with id:" + params.podId + " already exists");
        }
        const podData = await this.getAsset(ctx, "podPlant", params.podId);
        if (!podData)
            throw new Error("The pod with id:" + params.podId + " does not exists");
        const plant = new plantStruct_1.PodPlantStruct(params.plantId, params.podId, [{ "time": 0, "consumption": 0 }]);
        await ctx.stub.putState(plant.plantId, Buffer.from(JSON.stringify(sort_keys_recursive_1.default(plant))))
            .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
};
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PlantOperations.prototype, "CreatePlant", null);
PlantOperations = __decorate([
    fabric_contract_api_1.Info({ title: "crud for the plant ", description: "Operation of update create for the plant " }),
    __metadata("design:paramtypes", [])
], PlantOperations);
exports.PlantOperations = PlantOperations;
//# sourceMappingURL=plantCrud.js.map