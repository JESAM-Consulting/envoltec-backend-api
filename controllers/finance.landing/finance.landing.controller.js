const messages = require("../../json/message.json");
const DB = require("../../models");
const apiResponse = require("../../utils/api.response");
const { financeLandingEmail } = require("../../service/mail.service")

/* APIS For FinanceLanding */
module.exports = exports = {

  /* Create FinanceLanding API */
  createFinanceLanding: async (req, res) => {
    if (!req.file) return apiResponse.BAD_REQUEST({ res, message: messages.NOT_FOUND })
    const data = await DB.FINANCELANDING.create({ ...req.body, image: req.file.location });
    await financeLandingEmail({ data })
    return apiResponse.OK({ res, message: messages.SUCCESS, data });
  },

  /* Get FinanceLanding API */
  getFinanceLanding: async (req, res) => {
    let { page, limit, skip, sortBy, sortOrder, search, ...query } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 100;
    sortBy = sortBy || "createdAt";
    sortOrder = sortOrder || -1;

    search ? query.$or = [
      { fname: { $regex: search, $options: "i" } },
      { lname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { reffrence: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ] : ""

    const data = await DB.FINANCELANDING
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .lean();

    return apiResponse.OK({ res, message: messages.SUCCESS, data: { count: await DB.FINANCELANDING.countDocuments(query), data: data } });
  },

  /* Update FinanceLanding API*/
  updateFinanceLanding: async (req, res) => {
    const dataExists = await DB.FINANCELANDING.findById(req.params._id);
    if (!dataExists) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });

    await DB.FINANCELANDING.findByIdAndUpdate(req.params._id, { ...req.body, image: req.file ? req.file.location : dataExists.image }, { new: true, });

    return apiResponse.OK({ res, message: messages.SUCCESS });
  },

  /* Delete FinanceLanding API*/
  deleteFinanceLanding: async (req, res) => {
    if (!await DB.FINANCELANDING.findOne({ _id: req.params._id })) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    await DB.FINANCELANDING.findByIdAndDelete(req.params._id);

    return apiResponse.OK({ res, message: messages.SUCCESS });
  },
};