import response from '../../../common/helpers/error-handler';
import errorCode from "../../../common/constants/error-codes"
 
class createGateway {
  constructor(gatewayService) {
    this.service = gatewayService;
  }

  // AppData ==> WEDSID , Client.
  async execute(gateway) {
    try {
      
      let result = await this.service.create(gateway);

      if (result.error) {
        return response.respond(
          true,
          result._l,
          null,
          result.code,
          result.details,
          "execute#createGateway#25"
        );
      } else {
        return response.respond(false, false,result.data);
      }
    } catch (exception) {
      return response.respond(true, false, null, errorCode.ENABLE_TO_SAVE_RECORD_TO_DATA_BASE, exception,
        "Not able to save data.", "", "", `createGateway`);
    }
  }
}

export default createGateway;
