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
exports.PlantStruct = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let PlantStruct = class PlantStruct {
    constructor(plantId, podId, generatedEnergy) {
        this.type = "plant";
        this.plantId = plantId;
        this.podId = podId;
        this.generatedEnergy = generatedEnergy;
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PlantStruct.prototype, "type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PlantStruct.prototype, "podId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PlantStruct.prototype, "plantId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Array)
], PlantStruct.prototype, "generatedEnergy", void 0);
PlantStruct = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [String, String, Array])
], PlantStruct);
exports.PlantStruct = PlantStruct;
//# sourceMappingURL=plantStruct.js.map