import errorCode from "../../../common/constants/error-codes";
import response from "../../../common/helpers/error-handler";

class getAllGateways {
  constructor(gatewayService, peripheralSsService) {
    this.service = gatewayService;
    this.peripheralService = peripheralSsService;
  }

  async execute() {
    try {
      let result = await this.service.readAll({});
      let devices = [];
      if (result.data) {
        const deviceIds = result.data;
        for (const device in deviceIds) {
          let element = deviceIds[device];
          element.peripherals=[];
          let info = await this.peripheralService.read({
            gateway: element._id,
          });

          if (info.data) {
            element.peripherals.push(info.data);
          }
          devices.push(element)
        }
       }

      if (result.error) {
        return response.respond(
          true,
          result._l,
          null,
          result.code,
          result.details,
          "",
          "execute#getAll#24"
        );
      } else {
        return response.respond(false, false, devices);
      }
    } catch (exception) {
      return response.respond(
        true,
        false,
        null,
        errorCode.ERROR_LOADING_DATA_FROM_DATABASE,
        exception,
        "Not able to retrive data.",
        "",
        "",
        `getAllGateways`
      );
    }
  }
}

export default getAllGateways;
