import response from '../../../common/helpers/error-handler';
import errorCode from "../../../common/constants/error-codes"
import mongoose from 'mongoose'

class updatePeripheral {
  constructor(gatewayService) {
    this.service = gatewayService;
  }

   async execute(peripheral) {
    try {
        let gatewayIdQuery = { '_id': mongoose.Types.ObjectId(peripheral._id)};
        let setQuery = {
            $set:
            {
                'uid': peripheral.uid,
                'vendor': peripheral.vendor,
                'status': peripheral.status,
            }
        };

        let result = await this.service.updateByQuery(gatewayIdQuery,setQuery);

      if (result.error) {
        return response.respond(
          true,
          result._l,
          null,
          result.code,
          result.details,
          "",
         
          "execute#updateGateway"
        );
      } else {
        return response.respond(false, false,result.data);
      }
    } catch (exception) {
      return response.respond(true, false, null, errorCode.ENABLE_TO_SAVE_RECORD_TO_DATA_BASE, exception,
        "Not able to save data.", "", "", `updateGateway`);
    }
  }
}

export default updatePeripheral;
