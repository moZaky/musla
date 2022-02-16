import response from "../../../common/helpers/error-handler.js";
import errorCodes from "../../../common/constants/error-codes.js";

// App Use cases.
import gateWayApp from "../../../application/gateway/gateway.app.js";
let gatewaysUC = gateWayApp();

async function createGateway(req, res, next) {
   let gateWay = req.body.data;
  let result = await gatewaysUC.createGateway.execute(gateWay);
 
  if (result.error) {
    res.json(
      response.respond(
        true,
        result._l,
        null,
        result.code,
        result.details,
        "Your request has been terminated.",

        "createGateway#data.controller.js"
      )
    );
  } else {
    res.json(response.respond(false, false, result.data));
  }
}

async function updateGateway(req, res, next) {
  let gateWay = req.body.data;

  let result = await gatewaysUC.updateGateway.execute(gateWay);

  if (result.error) {
    res.json(
      response.respond(
        true,
        result._l,
        null,
        result.code,
        result.details,
        "Your request has been terminated.",
        "updateGateway.controller.js"
      )
    );
  } else {
    res.json(response.respond(false, false, result.data));
  }
}

async function deleteGateway(req,res, next) {
  let id = req.params.Id;
 
  let result = await gatewaysUC.deleteGateway.execute(id);

  if (result.error) {
    res.json(
      response.respond(
        true,
        result._l,
        null,
        result.code,
        result.details,
        "Your request has been terminated.",

        "deleteGateway.controller.js"
      )
    );
  } else {
    res.json(response.respond(false, false, result.data));
  }
}

async function getAll(req, res, next) {
  let result = await gatewaysUC.getAllGateway.execute();

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
  createGateway,
  updateGateway,
  deleteGateway,
  getAll,
  test,
};

export default actions;
