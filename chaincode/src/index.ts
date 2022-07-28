import { PodCrudOperations } from './subcontract/pod/podController';
import { PlantOperations } from './subcontract/podPlant/plantCrontroller';
import { ComunityController } from './subcontract/comunity/comunityController';
import { UserConsumptionsOperations } from './subcontract/userConsumption/userConsumptionController';

export { PodCrudOperations } from './subcontract/pod/podController';
export { PlantOperations } from './subcontract/podPlant/plantCrontroller';
export { ComunityController } from './subcontract/comunity/comunityController';
export {UserConsumptionsOperations} from './subcontract/userConsumption/userConsumptionController';

export const contracts: any[] = [PodCrudOperations,PlantOperations,ComunityController,UserConsumptionsOperations];
