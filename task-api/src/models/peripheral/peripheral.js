import mongoose from "mongoose";

class peripheral {
    constructor() { }

    initSchema() {
        const schema = new mongoose.Schema({
            uid: {
                type: Number,
                unique: true,
                required: true,
            },
            vendor: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
                enum: ["ONLINE", "OFFLINE"],
              },
            gateway: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'gateway',
            },
         }, { timestamps: true });

        return mongoose.models.peripheral || mongoose.model('peripheral', schema);
    }

    constructModel() {
        return this.initSchema();
    }
}

export default peripheral;
