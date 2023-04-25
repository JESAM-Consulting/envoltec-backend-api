const { Schema, model } = require("mongoose");

const financeLandingSchema = new Schema(
    {
        fname: { type: String },
        lname: { type: String },
        email: { type: String },
        phone: { type: String },
        pincode: { type: String },
        city: { type: String },
        street: { type: String },
        applyTo: { type: String },
        remark: { type: String },
        image: { type: String, default: "" }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

let financeLandingModel = model("financeLanding", financeLandingSchema, "financeLanding");

module.exports = financeLandingModel;