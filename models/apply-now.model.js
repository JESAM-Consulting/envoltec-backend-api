const { Schema, model } = require("mongoose");
const { COLOR } = require("../json/enums.json");

const applyNowSchema = new Schema(
    {
        project: { type: String, default: "apply now" },
        userName: { type: String },
        postalCode: { type: String },
        email: { type: String },
        phone: { type: String },
        isSales: { type: Boolean, default: false },
        workYears: { type: String },
        sms: { type: Boolean, default: null },
        contactedBy: { type: String, default: null },
        contactedOn: { type: Date, default: null },
        contactedAgain: { type: Date, default: null },
        lastContact: { type: Date, default: null },
        emailFailed: { type: Boolean, default: null },
        reached: { type: Boolean, default: null },
        appointmentDate: { type: Date, default: null },
        appointmentTime: { type: String, default: null },
        makeAppointment: { type: String, default: null },
        usefulInformation: { type: String, default: null },
        nichtGeeignet: { type: Boolean, default: null },
        color: { type: String, enum: COLOR, default: COLOR.RED },
        starterSeminar: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

let applyNowrModel = model("applyNow", applyNowSchema, "applyNow");

module.exports = applyNowrModel;