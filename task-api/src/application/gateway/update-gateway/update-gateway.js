import response from '../../../common/helpers/error-handler';
import errorCode from "../../../common/constants/error-codes"
import mongoose from 'mongoose'

class updateGateway {
  constructor(gatewayService) {
    this.service = gatewayService;
  }

   async execute(gateway) {
    try {
        let gatewayIdQuery = { '_id': mongoose.Types.ObjectId(gateway._id)};
        let setQuery = {
            $set:
            {
                'name': gateway.name,
                'serial': gateway.serial,
                'ip': gateway.ip,
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
         
          "execute#updateGateway#37"
        );
      } else {
        return response.respond(false, false,result.data);
      }
    } catch (exception) {
      return response.respond(true, false, null, errorCode.ENABLE_TO_SAVE_RECORD_TO_DATA_BASE, exception,
        "Not able to save data.", "", "", `updateGateway#gateway`);
    }
  }
}

export default updateGateway;
