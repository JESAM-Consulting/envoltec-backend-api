const messages = require("../../json/message.json");
const DB = require("../../models");
const apiResponse = require("../../utils/api.response");
const { sendDataToEmail } = require("../../service/mail.service")

/* APIS For Appointment */
module.exports = exports = {

  /* Create Appointment API */
  createAppointment: async (req, res) => {
    const data = await DB.APPOINTMENT.create(req.body);
    await sendDataToEmail({ data })
    return apiResponse.OK({ res, message: messages.SUCCESS, data });
  },

  /* Get Appointment API */
  getAppointment: async (req, res) => {
    let { page, limit, skip, sortBy, sortOrder, search, ...query } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 100;
    sortBy = sortBy || "createdAt";
    sortOrder = sortOrder || -1;

    search ? query.$or = [
      { fname: { $regex: search, $options: "i" } },
      { lname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ] : ""

    const data = await DB.APPOINTMENT
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .lean();

    return apiResponse.OK({ res, message: messages.SUCCESS, data: { count: await DB.APPOINTMENT.countDocuments(query), data: data } });
  },

  /* Update Appointment API*/
  updateAppointment: async (req, res) => {
    const update = await DB.APPOINTMENT.findByIdAndUpdate(req.params._id, data, { new: true, });
    if (!update) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    return apiResponse.OK({ res, message: messages.SUCCESS });
  },

  /* Delete Appointment API*/
  deleteAppointment: async (req, res) => {
    if (!await DB.APPOINTMENT.findOne({ _id: req.params._id })) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    await DB.APPOINTMENT.findByIdAndDelete(req.params._id);

    return apiResponse.OK({ res, message: messages.SUCCESS });
  },
};