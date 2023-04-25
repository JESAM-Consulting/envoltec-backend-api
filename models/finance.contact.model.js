const { Schema, model } = require("mongoose");

const financeContactSchema = new Schema(
    {
        fname: { type: String },
        lname: { type: String },
        email: { type: String },
        reffrence: { type: String },
        description: { type: String }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

let financeContactModel = model("financeContact", financeContactSchema, "financeContact");

module.exports = financeContactModel;