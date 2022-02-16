import { Router } from "express";
import actions from "./peripheral.controller.js";

var router = Router();

router.route("/create-peripheral").post(actions.createPeripheral);

router.route("/update-peripheral").post(actions.updatePeripheral);

router.route("/delete-peripheral/:Id").post(actions.deletePeripheral);

router.route("/get-all/:Id").get(actions.getAll);
export default router;
