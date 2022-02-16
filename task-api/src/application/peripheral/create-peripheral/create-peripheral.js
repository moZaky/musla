import response from "../../../common/helpers/error-handler";
import errorCode from "../../../common/constants/error-codes";

class createPeripheral {
  constructor(peripheralService) {
    this.service = peripheralService;
  }

  async execute(peripheral) {
    try {
      let result = await this.service.create(peripheral);

      if (result.error) {
        return response.respond(
          true,
          result._l,
          null,
          result.code,
          result.details,
          "execute#createPeripheral"
        );
      } else {
        return response.respond(false, false, result.data);
      }
    } catch (exception) {
      return response.respond(
        true,
        false,
        null,
        errorCode.ENABLE_TO_SAVE_RECORD_TO_DATA_BASE,
        exception,
        "Not able to save data.",
        "",
        "",
        `createPeripheral`
      );
    }
  }
}

export default createPeripheral;
