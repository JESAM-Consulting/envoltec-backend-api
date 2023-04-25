const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
    {
        fname: { type: String },
        lname: { type: String },
        email: { type: String },
        phone: { type: String },
        choice: { type: String },
        isAgree: { type: Boolean },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

let appointmentModel = model("appointment", appointmentSchema, "appointment");

module.exports = appointmentModel;