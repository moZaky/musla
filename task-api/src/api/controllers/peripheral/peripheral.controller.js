import response from "../../../common/helpers/error-handler.js";
import errorCodes from "../../../common/constants/error-codes.js";

// App Use cases.
import peripheralAPP from "../../../application/peripheral/peripheral.app";
let peripheralsUC = peripheralAPP();

async function createPeripheral(req, res, next) {
   let peripheral = req.body.data;
  let result = await peripheralsUC.createPeripheral.execute(peripheral);
 
  if (result.error) {
    res.json(
      response.respond(
        true,
        result._l,
        null,
        result.code,
        result.details,
        "Your request has been terminated.",

        "createPeripheral#data.controller.js"
      )
    );
  } else {
    res.json(response.respond(false, false, result.data));
  }
}

async function updatePeripheral(req, res, next) {
  let peripheral = req.body.data;

  let result = await peripheralsUC.updatePeripheral.execute(peripheral);

  if (result.error) {
    res.json(
      response.respond(
        true,
        result._l,
        null,
        result.code,
        result.details,
        "Your request has been terminated.",
        "updatePeripheral.controller.js"
      )
    );
  } else {
    res.json(response.respond(false, false, result.data));
  }
}

async function deletePeripheral(req,res, next) {
  let id = req.params.Id;
 
  let result = await peripheralsUC.deletePeripheral.execute(id);

  if (result.error) {
    res.json(
      response.respond(
        true,
        result._l,
        null,
        result.code,
        result.details,
        "Your request has been terminated.",

        "deletePeripheral.controller.js"
      )
    );
  } else {
    res.json(response.respond(false, false, result.data));
  }
}

async function getAll(req, res, next) {
  let id = req.params.Id;

  let result = await peripheralsUC.getAllPeripheral.execute(id);

  if (result.error) {
    res.json(
      response.respond(
        true,
        result._l,
        null,
        result.code,
        result.details,
        "Your request has been terminated.",

        "getAll.controller.js"
      )
    );
  } else {
    res.json(response.respond(false, false, result.data));
  }
}

async function test(req, res, next) {
  res.json(response.respond(false, false, "result.data"));
}

const actions = {
  createPeripheral,
  updatePeripheral,
  deletePeripheral,
  getAll,
  test,
};

export default actions;
