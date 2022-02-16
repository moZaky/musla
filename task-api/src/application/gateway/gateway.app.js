  

import gateway from '../../models/gateway/gateway';
import gateWayService from '../../services/gateway.service';
const gatewaysService = new gateWayService(new gateway().constructModel());
 
import peripheral from '../../models/peripheral/peripheral';
import peripheralService from '../../services/peripheral.service';
const peripheralSsService = new peripheralService(new peripheral().constructModel());
 
// Use cases!
 
import createGateway from './create-gateway/create-gateway';
import updateGateway from './update-gateway/update-gateway';
import deleteGateway from './delete-gateway/delete-gateway';
import getAllGateway  from './get-all-gateways/get-all-gateways';

 
export default () => {
    return Object.freeze({
        //Gateways
        createGateway: new createGateway(gatewaysService),
        updateGateway: new updateGateway(gatewaysService),
        deleteGateway: new deleteGateway(gatewaysService),
        getAllGateway: new getAllGateway(gatewaysService,peripheralSsService),
    })
};