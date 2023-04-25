const messages = require("../../json/message.json");
const DB = require("../../models");
const apiResponse = require("../../utils/api.response");
const { sendDataToEmail } = require("../../service/mail.service")

/* APIS For Alpha */
module.exports = exports = {

  /* Create Alpha API */
  createAlpha: async (req, res) => {
    const data = await DB.ALPHA.create(req.body);
    return apiResponse.OK({ res, message: messages.SUCCESS, data });
  },

  /* Get Alpha API */
  getAlpha: async (req, res) => {
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
      { company: { $regex: search, $options: "i" } },
    ] : ""

    const data = await DB.ALPHA
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .lean();

    return apiResponse.OK({ res, message: messages.SUCCESS, data: { count: await DB.ALPHA.countDocuments(query), data: data } });
  },

  /* Update Alpha API*/
  updateAlpha: async (req, res) => {
    const update = await DB.ALPHA.findByIdAndUpdate(req.params._id, req.body, { new: true, });
    if (!update) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    return apiResponse.OK({ res, message: messages.SUCCESS });
  },

  /* Delete Alpha API*/
  deleteAlpha: async (req, res) => {
    if (!await DB.ALPHA.findOne({ _id: req.params._id })) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    await DB.ALPHA.findByIdAndDelete(req.params._id);

    return apiResponse.OK({ res, message: messages.SUCCESS });
  },
};