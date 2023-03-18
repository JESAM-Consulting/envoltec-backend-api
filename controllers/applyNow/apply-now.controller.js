const messages = require("../../json/message.json");
const DB = require("../../models");
const apiResponse = require("../../utils/api.response");
const { USER_TYPE: { ADMIN } } = require("../../json/enums.json");
const { handleStatusColor } = require("../../script")

/* APIS For ApplyNow */
module.exports = exports = {

  /* Create ApplyNow API */
  createApplyNow: async (req, res) => {
    const applyNow = await DB.APPLYNOW.create(req.body);
    return apiResponse.OK({ res, message: messages.SUCCESS, data: applyNow });
  },

  /* Get ApplyNow API */
  getApplyNow: async (req, res) => {
    let { page, limit, skip, sortBy, sortOrder, search, startDate, endDate, color, ...query } = req.body;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 100;

    search ? query = {
      $or: [{ userName: { $regex: search, $options: "i" } },]
    } : ""

    query = (startDate && endDate)
      ? { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate).setHours(23, 59, 59) } }
      : query;

    query = color ? { ...query, color: color } : query;

    const applyNows = await DB.APPLYNOW
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .lean();

    return apiResponse.OK({ res, message: messages.SUCCESS, data: { count: await DB.APPLYNOW.countDocuments(query), data: applyNows } });
  },

  /* Update ApplyNow API*/
  updateApplyNow: async (req, res) => {
    let { contactedOn, contactedAgain, lastContact, appointmentDate } = req.body;

    let applyNowExists = await DB.APPLYNOW.findOne({ _id: req.params._id, isActive: true });
    if (!applyNowExists) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });

    if (contactedOn) contactedOn = new Date(contactedOn) || applyNowExists.contactedOn
    if (contactedAgain) contactedAgain = new Date(contactedAgain) || applyNowExists.contactedAgain
    if (lastContact) lastContact = new Date(lastContact) || applyNowExists.lastContact
    if (appointmentDate) appointmentDate = new Date(appointmentDate) || applyNowExists.appointmentDate

    let data = {
      $set: {
        ...req.body,
        contactedOn: contactedOn,
        contactedAgain: contactedAgain,
        lastContact: lastContact,
        appointmentDate: appointmentDate,
      }
    }

    const update = await DB.APPLYNOW.findByIdAndUpdate(req.params._id, data, { new: true, });
    await handleStatusColor({ data: [update], models: DB.APPLYNOW })
    return apiResponse.OK({ res, message: messages.SUCCESS });
  },

  /* Delete ApplyNow API*/
  deleteApplyNow: async (req, res) => {
    if (!await DB.APPLYNOW.findOne({ _id: req.params._id })) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    await DB.APPLYNOW.findByIdAndDelete(req.params._id);

    return apiResponse.OK({ res, message: messages.SUCCESS });
  },
};