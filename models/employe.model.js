const { Schema, model } = require("mongoose");
const { COLOR } = require("../json/enums.json");

const employeSchema = new Schema(
    {
        id: { type: String },
        createdTime: { type: Date },
        adId: { type: String },
        adName: { type: String },
        adsetId: { type: String },
        adsetName: { type: String },
        campaignId: { type: String },
        campaignName: { type: String },
        formId: { type: String },
        formName: { type: String },
        isOrganic: { type: String },
        plateform: { type: String },
        earn:  { type: String },
        isEmployed: { type: String },
        salesExperience: { type: String },
        answer: { type: String },
        fname: { type: String },
        lname: { type: String },
        phone: { type: String },
        email: { type: String },
        state: { type: String },
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

let employeeModel = model("employee", employeSchema, "employee");

module.exports = employeeModel;