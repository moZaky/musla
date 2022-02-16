import response from '../../../common/helpers/error-handler';
import errorCode from "../../../common/constants/error-codes"
import mongoose from 'mongoose'

class deletePeripheral {
  constructor(peripheralService) {
    this.service = peripheralService;
  }

   async execute(id) {
    try {

        let result = await this.service.delete(id);
 
      if (result.error) {
        return response.respond(
          true,
          result._l,
          null,
          result.code,
          result.details,
          "", 
          "execute#deletePeripheral"
        );
      } else {
        return response.respond(false, false);
      }
    } catch (exception) {
      return response.respond(true, false, null, errorCode.ENABLE_TO_SAVE_RECORD_TO_DATA_BASE, exception,
        "Not able to save data.", "", "", `deletePeripheral`);
    }
  }
}

export default deletePeripheral;
