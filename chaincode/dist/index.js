"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contracts = void 0;
const podController_1 = require("./subcontract/pod/podController");
const plantCrontroller_1 = require("./subcontract/podPlant/plantCrontroller");
const comunityController_1 = require("./subcontract/comunity/comunityController");
const userConsumptionController_1 = require("./subcontract/userConsumption/userConsumptionController");
var podController_2 = require("./subcontract/pod/podController");
Object.defineProperty(exports, "PodCrudOperations", { enumerable: true, get: function () { return podController_2.PodCrudOperations; } });
var plantCrontroller_2 = require("./subcontract/podPlant/plantCrontroller");
Object.defineProperty(exports, "PlantOperations", { enumerable: true, get: function () { return plantCrontroller_2.PlantOperations; } });
var comunityController_2 = require("./subcontract/comunity/comunityController");
Object.defineProperty(exports, "ComunityController", { enumerable: true, get: function () { return comunityController_2.ComunityController; } });
var userConsumptionController_2 = require("./subcontract/userConsumption/userConsumptionController");
Object.defineProperty(exports, "UserConsumptionsOperations", { enumerable: true, get: function () { return userConsumptionController_2.UserConsumptionsOperations; } });
exports.contracts = [podController_1.PodCrudOperations, plantCrontroller_1.PlantOperations, comunityController_1.ComunityController, userConsumptionController_1.UserConsumptionsOperations];
//# sourceMappingURL=index.js.map