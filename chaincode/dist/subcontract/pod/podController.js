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
exports.PodCrudOperations = void 0;
const comunityController_1 = require("./../comunity/comunityController");
const plantCrontroller_1 = require("./../podPlant/plantCrontroller");
const userConsumptionController_1 = require("./../userConsumption/userConsumptionController");
const asset_1 = require("../../utility/asset");
const fabric_contract_api_1 = require("fabric-contract-api");
const contractExtension_1 = require("../../utility/contractExtension");
let PodCrudOperations = class PodCrudOperations extends contractExtension_1.ContractExtension {
    constructor() {
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("pod");
    }
    async InitLedger(ctx) {
        const pod = [
            {
                podId: "Pod1",
                comunityId: "Comunity1",
                plantIds: ["Plant2"],
                exchangedEnergy: [{ "time": 0, "exchangedEnergy": 0 }],
                storedEnergy: [{ "time": 0, "storedEnergy": 0 }],
                type: "pod",
                offgrid: ''
            },
            {
                podId: "Pod2",
                comunityId: "Comunity1",
                plantIds: ["Plant3", "Plant1"],
                exchangedEnergy: [{ "time": 0, "exchangedEnergy": 0 }],
                storedEnergy: [{ "time": 0, "storedEnergy": 0 }],
                type: "pod",
                offgrid: ''
            },
            {
                podId: "Pod3",
                comunityId: "Comunity1",
                plantIds: ["Plant1"],
                exchangedEnergy: [{ "time": 0, "exchangedEnergy": 0 }],
                storedEnergy: [{ "time": 0, "storedEnergy": 0 }],
                type: "pod",
                offgrid: ''
            },
            {
                podId: "Pod4",
                comunityId: "Comunity1",
                plantIds: ["Plant1", "Plant2"],
                exchangedEnergy: [{ "time": 0, "exchangedEnergy": 0 }],
                storedEnergy: [{ "time": 0, "storedEnergy": 0 }],
                type: "pod",
                offgrid: ''
            }
        ];
        // const Comunity=new ComunityController(); 
        // const plant=new PlantOperations();
        const comunity = {
            comunityId: "Comunity1",
            podList: ['Pod1', 'Pod2', 'Pod3', 'Pod4'],
            type: "comunity",
        };
        const plant1 = {
            plantId: "Plant1",
            generatedEnergy: [{ "time": 0, "generatedEnergy": 0 }],
            type: "plant",
        };
        const plant2 = {
            plantId: "Plant2",
            generatedEnergy: [{ "time": 0, "generatedEnergy": 0 }],
            type: "plant"
        };
        const plant3 = {
            plantId: "Plant3",
            generatedEnergy: [{ "time": 0, "generatedEnergy": 0 }],
            type: "plant"
        };
        const user1 = {
            userConsumptionId: "User1",
            podId: "Pod1",
            consumption: [{ "time": 0, "EnergyConsumption": 0 }],
            type: "userConsumption"
        };
        const user2 = {
            userConsumptionId: "User2",
            podId: "Pod1",
            consumption: [{ "time": 0, "EnergyConsumption": 0 }],
            type: "userConsumption",
        };
        for (const asset of pod) {
            await ctx.stub.putState('pod' + '-' + asset.podId, Buffer.from(JSON.stringify(asset)))
                .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
            console.log(`Asset ${asset.podId} initialized`);
        }
        //await Comunity.CreateComunity(ctx,`{type:"comunity",comunityId:"Comunity1",podList:['Pod1','Pod2','Pod3']}`)
        await ctx.stub.putState('comunity-' + comunity.comunityId, Buffer.from(JSON.stringify(comunity)));
        await ctx.stub.putState('plant-' + plant1.plantId, Buffer.from(JSON.stringify(plant1)));
        await ctx.stub.putState('plant-' + plant2.plantId, Buffer.from(JSON.stringify(plant2)));
        await ctx.stub.putState('plant-' + plant3.plantId, Buffer.from(JSON.stringify(plant3)));
        await ctx.stub.putState('userConsumption-' + user1.userConsumptionId, Buffer.from(JSON.stringify(user1)));
        await ctx.stub.putState('userConsumption-' + user2.userConsumptionId, Buffer.from(JSON.stringify(user2)));
    }
    async CreatePod(ctx, param) {
        const comunityClass = new comunityController_1.ComunityController();
        const plantClass = new plantCrontroller_1.PlantOperations();
        const params = JSON.parse(param);
        const pod_exist = await this.get(ctx, params.podId);
        const comunity_exist = await comunityClass.get(ctx, params.comunityId);
        const plant_exist = await plantClass.get(ctx, params.plantId);
        if (pod_exist.podId != undefined) {
            throw new Error("The pod  with id:" + pod_exist.podId + " already exists");
        }
        if (!comunity_exist) {
            throw new Error("The comunity  with id:" + comunity_exist.comunityId + " does not exists");
        }
        if (!plant_exist) {
            throw new Error("The plant with id: " + plant_exist.plantId + " does not exist");
        }
        const pod = {
            type: "pod",
            comunityId: params.comunityId,
            podId: params.podId,
            plantIds: [],
            exchangedEnergy: [{ "time": 0, "exchangedEnergy": 0 }],
            storedEnergy: [{ "time": 0, "storedEnergy": 0 }],
            offgrid: '',
        };
        return Promise.all([
            await ctx.stub.putState('pod' + '-' + pod.podId, Buffer.from(JSON.stringify(pod))),
            await comunityClass.addPodToComunity(ctx, params.podId, params.comunityId),
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async updateExchangedEnergy(ctx, id, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, id);
        if (!exist) {
            throw new Error("The pod  with id:" + params.podId + " does not exists");
        }
        /* const pod={
                 type:'pod',
                 podId:id,
                 exchangedEnergy:[...exist.exchangedEnergy,{"time":params.time,"energy":params.storedEnergy}],
                 storedEnergy:exist.storedEnergy,
                 offgrid:exist.offgrid
             };*/
        const pod = this.generatePodObj(id, [...exist.exchangedEnergy, { "time": params.time, "exchangedEnergy": params.storedEnergy }], exist.storedEnergy, exist.offgrid);
        //exist.exchangedEnergy=exist.exchangedEnergy.push(params.exchangedEnergy)
        return Promise.all([
            await ctx.stub.putState('pod-' + exist.podId, Buffer.from(JSON.stringify(pod)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async updateStoredEnergy(ctx, id, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, id);
        if (exist.podId == undefined) {
            throw new Error("The pod  with id:" + exist.podId + " does not exists");
        }
        /*const pod={
            type:'pod',
            podId:id,
            exchangedEnergy:exist.exchangedEnergy,
            storedEnergy:[...exist.storedEnergy,{"time":params.time,"energy":params.storedEnergy}],
            offgrid:exist.offgrid
        };*/
        const pod = this.generatePodObj(id, exist.exchangedEnergy, [...exist.storedEnergy, { "time": params.time, "storedEnergy": params.storedEnergy }], exist.offgrid);
        //exist.storedEnergy=exist.storedEnergy.push(params.storedEnergy)
        return Promise.all([
            await ctx.stub.putState('pod-' + exist.podId, Buffer.from(JSON.stringify(pod)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
        ;
    }
    async updateOffGrid(ctx, id, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, id);
        if (!exist) {
            throw new Error("The pod  with id:" + params.podId + " does not exists");
        }
        /*const pod={
            type:'pod',
            podId:id,
            exchangedEnergy:exist.exchangedEnergy,
            storedEnergy:exist.storedEnergy,
            offgrid:params.offgrid,
        };*/
        const pod = this.generatePodObj(id, exist.exchangedEnergy, exist.storedEnergy, params.offgrid);
        return Promise.all([
            await ctx.stub.putState('pod-' + exist.podId, Buffer.from(JSON.stringify(pod)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
        ;
    }
    generatePodObj(id, exchangedEnergy, storedEnergy, offgrid) {
        const pod = {
            podId: id,
            exchangedEnergy: exchangedEnergy,
            storedEnergy: storedEnergy,
            type: 'pod',
            offgrid: offgrid,
        };
        return pod;
    }
    async DeletePod(ctx, param) {
        const params = JSON.parse(param);
        const comunityClass = new comunityController_1.ComunityController();
        const userClass = new userConsumptionController_1.UserConsumptionsOperations();
        const exists = await this.get(ctx, params.podId);
        const comunities = JSON.parse(await comunityClass.getAll(ctx));
        if (!exists) {
            throw new Error(`The pod ${params.podId} does not exist`);
        }
        //const comunities=comunity.getComunities();
        for (const comunity of comunities) {
            let pods = comunity.podList;
            if (pods.includes(params.podId) === true) {
                await comunityClass.DeletePodFromComunity(ctx, params.podId, comunity.comunityId);
            }
        }
        return Promise.all([
            userClass.deletePodFromUsers(ctx, params.podId),
            await ctx.stub.deleteState('pod-' + params.podId)
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async podUpdatePlant(ctx, param) {
        const params = JSON.parse(param);
        const plantClass = new plantCrontroller_1.PlantOperations();
        const exist = await this.get(ctx, params.podId);
        const plant = await plantClass.get(ctx, params.plantId);
        if (!plant) {
            throw new Error(`The plant ${plant.plantId} does not exist`);
        }
        else if (!exist) {
            throw new Error(`The pod ${exist.podId} does not exist`);
        }
        else {
            if (exist.plantIds.indexOf(params.plantId) !== -1)
                return { status: asset_1.Status.Success, message: "Operazione effetuata" };
            else {
                exist.plantIds = exist.plantIds.concat(params.plantId);
                return Promise.all([await ctx.stub.putState('pod-' + exist.podId, Buffer.from(JSON.stringify(exist)))])
                    .then(() => { return { status: asset_1.Status.Success, message: "Operazione effetuata" }; });
            }
        }
    }
    async podUpdateComunity(ctx, param) {
        const params = JSON.parse(param);
        const comunityClass = new comunityController_1.ComunityController();
        const exist = await this.get(ctx, params.podId);
        const comunity = await comunityClass.get(ctx, params.comunityId);
        if (!comunity) {
            throw new Error(`The comunity ${comunity.comunityId} does not exist`);
        }
        else if (!exist) {
            throw new Error(`The pod ${exist.podId} does not exist`);
        }
        else {
            exist.comunityId = params.comunityId;
            comunityClass.addPodToComunity(ctx, params.podId, params.comunityId);
            return Promise.all([await ctx.stub.putState('pod-' + exist.podId, Buffer.from(JSON.stringify(exist)))])
                .then(() => { return { status: asset_1.Status.Success, message: "Operazione effetuata" }; });
        }
    }
    async podRemoveComunity(ctx, param) {
        const params = JSON.parse(param);
        const comunityClass = new comunityController_1.ComunityController();
        const exist = await this.get(ctx, params.podId);
        if (!exist) {
            throw new Error(`The pod ${exist.podId} does not exist`);
        }
        else {
            exist.comunityId = undefined;
            comunityClass.DeletePodFromComunity(ctx, exist.podId, exist.comunityId);
            return Promise.all([await ctx.stub.putState('pod-' + exist.podId, Buffer.from(JSON.stringify(exist)))])
                .then(() => { return { status: asset_1.Status.Success, message: "Operazione effetuata" }; });
        }
    }
    async removePlantfromPod(ctx, param) {
        const params = JSON.parse(param);
        const plantClass = new plantCrontroller_1.PlantOperations();
        const plant = await plantClass.get(ctx, params.plantId);
        const exist = await this.get(ctx, params.podId);
        if (!exist) {
            throw new Error(`The pod ${exist.plantIds} does not exist`);
        }
        else if (!plant) {
            throw new Error(`The plant ${exist.podId} does not exist`);
        }
        else {
            exist.plantIds = exist.plantIds.filter((elem) => elem !== params.plantId);
            return Promise.all([await ctx.stub.putState('pod-' + exist.podId, Buffer.from(JSON.stringify(exist)))])
                .then(() => { return { status: asset_1.Status.Success, message: "Operazione effetuata" }; });
        }
    }
    async removePlantfromPods(ctx, pods, plantId) {
        for (let i = 0; i < pods.length; i++) {
            var exists = await this.get(ctx, pods[i]);
            if (!exists) {
                throw new Error(`The pod ${pods[i]} does not exist`);
            }
            else {
                exists.plantIds = exists.plantIds.filter((elem) => elem !== plantId);
                await ctx.stub.putState('pod-' + exists.podId, Buffer.from(JSON.stringify(exists)));
            }
        }
    }
};
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "InitLedger", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "CreatePod", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "updateExchangedEnergy", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "updateStoredEnergy", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "updateOffGrid", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Array, String]),
    __metadata("design:returntype", void 0)
], PodCrudOperations.prototype, "generatePodObj", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "DeletePod", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "podUpdatePlant", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "podUpdateComunity", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "podRemoveComunity", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "removePlantfromPod", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, Array, String]),
    __metadata("design:returntype", Promise)
], PodCrudOperations.prototype, "removePlantfromPods", null);
PodCrudOperations = __decorate([
    fabric_contract_api_1.Info({ title: "crud for the pod ", description: "Operation of update create for the pod " }),
    __metadata("design:paramtypes", [])
], PodCrudOperations);
exports.PodCrudOperations = PodCrudOperations;
//# sourceMappingURL=podController.js.map