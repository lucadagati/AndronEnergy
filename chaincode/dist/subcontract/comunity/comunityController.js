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
exports.ComunityController = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const contractExtension_1 = require("../../utility/contractExtension");
const podController_1 = require("../pod/podController");
const asset_1 = require("../../utility/asset");
let ComunityController = class ComunityController extends contractExtension_1.ContractExtension {
    constructor() {
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("comunity");
    }
    async CreateComunity(ctx, param) {
        const params = JSON.parse(param);
        for (const pod of params.pods) {
            const exist = await this.get(ctx, 'pod' + '-' + pod.Id);
            if (!exist)
                throw new Error("The pod with id:" + params.podId + " does not  exists");
        }
        const comunities = JSON.parse(await this.getAll(ctx));
        for (const comunity of comunities) {
            for (const pod in params.pods) {
                if (comunity.pods.include(pod)) {
                    throw new Error("The pod with id:" + params.podId + "is altready used");
                }
            }
        }
        const comunity = {
            type: "comunity",
            comunityId: params.comunityId,
            podList: params.pods
        };
        await ctx.stub.putState(comunity.type + "-" + comunity.comunityId, Buffer.from(JSON.stringify(comunity)))
            .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async getComunities(ctx) {
        return JSON.parse(await this.getAll(ctx));
    }
    // DeleteAsset deletes an given asset from the world state.
    async DeleteComunity(ctx, id) {
        const exists = await this.get(ctx, 'comunity-' + id);
        if (!exists) {
            throw new Error(`The comunity ${id} does not exist`);
        }
        return Promise.all([
            await ctx.stub.deleteState('comunity-' + id)
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async addPodToComunity(ctx, podId, comunityId) {
        const pod = new podController_1.PodCrudOperations();
        const comunity = await this.get(ctx, comunityId);
        const exist = await pod.get(ctx, podId);
        let podList = comunity.podList.filter((elem) => elem == podId);
        if (podList.length != 0) {
            throw new Error(`The pod ${podId}  altready exist in the comunity`);
        }
        if (!exist) {
            throw new Error(`The pod ${podId}  does not exist`);
        }
        comunity.podList = [...comunity.podList, podId];
        return Promise.all([
            await ctx.stub.putState('comunity-' + comunity.comunityId, Buffer.from(JSON.stringify(comunity)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async DeletePodFromComunity(ctx, podId, comunityId) {
        const pod = new podController_1.PodCrudOperations();
        const exist = await pod.get(ctx, podId);
        let comunity = await this.get(ctx, comunityId);
        let podList = comunity.podList.filter((elem) => elem === podId);
        if (!exist || podList.length === 0) {
            throw new Error(`The pod ${podId} ${comunity.podList[comunity.podList.length - 1]} does not exist in the comunity`);
        }
        comunity.podList = comunity.podList.filter((elem) => elem != podId);
        await ctx.stub.putState('comunity-' + comunity.comunityId, Buffer.from(JSON.stringify(comunity)));
    }
};
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ComunityController.prototype, "CreateComunity", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], ComunityController.prototype, "getComunities", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ComunityController.prototype, "DeleteComunity", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ComunityController.prototype, "addPodToComunity", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ComunityController.prototype, "DeletePodFromComunity", null);
ComunityController = __decorate([
    fabric_contract_api_1.Info({ title: "operations for Comunity", description: "defines the operations for the comunity" }),
    __metadata("design:paramtypes", [])
], ComunityController);
exports.ComunityController = ComunityController;
//# sourceMappingURL=comunityController.js.map