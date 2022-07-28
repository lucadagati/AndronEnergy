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
exports.PodStruct = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let PodStruct = class PodStruct {
    constructor(podId, exchangedEnergy, storedEnergy, offgrid) {
        this.type = "pod";
        this.podId = podId;
        this.offgrid = offgrid;
        this.exchangedEnergy = exchangedEnergy;
        this.storedEnergy = storedEnergy;
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PodStruct.prototype, "type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PodStruct.prototype, "podId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Array)
], PodStruct.prototype, "exchangedEnergy", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Array)
], PodStruct.prototype, "storedEnergy", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PodStruct.prototype, "offgrid", void 0);
PodStruct = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [String, Array, Array, String])
], PodStruct);
exports.PodStruct = PodStruct;
//# sourceMappingURL=podStruct.js.map