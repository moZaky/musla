import errorCode from "../../../common/constants/error-codes"
import response from '../../../common/helpers/error-handler';

class getAllPeripheral{
    constructor(peripheralService) {
        this.service = peripheralService;
    };

    async execute(gatewayId) {
        try {

            let result = await this.service.readAll({gateway:gatewayId});
            if (result.error) {
                return response.respond(
                    true,
                    result._l,
                    null,
                    result.code,
                    result.details,
                    "",
                    "execute#getAll"
                );
            } else {
                return response.respond(false, false, result.data);
            }

        } catch (exception) {
            return response.respond(true, false, null, errorCode.ERROR_LOADING_DATA_FROM_DATABASE, exception,
                "Not able to retrive data.", "", "", `gatewayId`);
        }
    };
};

export default getAllPeripheral;