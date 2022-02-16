  

import peripheral from '../../models/peripheral/peripheral';
import peripheralService from '../../services/peripheral.service';
const peripheralsService = new peripheralService(new peripheral().constructModel());
 
// Use cases!

//Areas
import createPeripheral from './create-peripheral/create-peripheral';
import updatePeripheral from './update-peripheral/update-peripheral';
import deletePeripheral from './delete-peripheral/delete-peripheral';
import getAllPeripheral  from './get-all-peripheral/get-all-peripheral';

 
export default () => {
    return Object.freeze({
        //peripherals
        createPeripheral: new createPeripheral(peripheralsService),
        updatePeripheral: new updatePeripheral(peripheralsService),
        deletePeripheral: new deletePeripheral(peripheralsService),
        getAllPeripheral: new getAllPeripheral(peripheralsService),
    })
};