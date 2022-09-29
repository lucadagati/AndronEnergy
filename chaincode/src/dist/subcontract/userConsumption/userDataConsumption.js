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
exports.UserConsumption = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let UserConsumption = class UserConsumption {
    constructor(userConsumptionId, podId, comunityId, consumption) {
        this.type = "userConsumption";
        this.podId = podId;
        this.userConsumptionId = userConsumptionId;
        this.consumption = consumption;
        this.comunityId = comunityId;
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], UserConsumption.prototype, "type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], UserConsumption.prototype, "userConsumptionId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], UserConsumption.prototype, "comunityId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], UserConsumption.prototype, "podId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Array)
], UserConsumption.prototype, "consumption", void 0);
UserConsumption = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [String, String, String, Array])
], UserConsumption);
exports.UserConsumption = UserConsumption;
//# sourceMappingURL=userDataConsumption.js.map