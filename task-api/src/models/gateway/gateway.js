import mongoose from "mongoose";
import validators from "./validators/gateway-validatore";
import errorCodes from "../../common/constants/error-codes";

class gateway {
  constructor() {}

  initSchema() {
    const schema = new mongoose.Schema({
      ip: {
        type: String,
        validate: {
          validator: function (v) {
            return new validators().ip(v);
          },
          message: `Message: ${
            errorCodes.IP_NOT_VALID.message
          }, Code: ${errorCodes.IP_NOT_VALID.code.toString()}`,
        },
      },
      serial: {
        type: String,
        unique: true,
        required: true,
      },
      name: {
        type: String,
        required: true,
    },
      peripherals: [
        { type: mongoose.Schema.Types.ObjectId, ref: "peripheral" },
      ],
    },{ timestamps: true });

    return mongoose.models.gateway || mongoose.model("gateway", schema);
  }

  constructModel() {
    return this.initSchema();
  }
}

export default gateway;
