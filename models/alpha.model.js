const { Schema, model } = require("mongoose");
const { COLOR } = require("../json/enums.json");

const alphaSchema = new Schema(
    {
        fname: { type: String },
        lname: { type: String },
        company: { type: String },
        postCode: { type: String },
        email: { type: String },
        phone: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

let alphaModel = model("alpha", alphaSchema, "alpha");

module.exports = alphaModel;