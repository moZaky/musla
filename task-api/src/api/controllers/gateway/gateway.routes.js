import { Router } from "express";
import actions from "./gateway.controller.js";

var router = Router();

router.route("/create-Gateway").post(actions.createGateway);

router.route("/update-Gateway").post(actions.updateGateway);

router.route("/delete-Gateway/:Id").post(actions.deleteGateway);

router.route("/get-all/").get(actions.getAll);
router.route("/test/").get(actions.test);
export default router;
