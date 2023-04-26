const messages = require("../../json/message.json");
const DB = require("../../models");
const apiResponse = require("../../utils/api.response");
const { financeContactEmail } = require("../../service/mail.service")

/* APIS For FinanceContact */
module.exports = exports = {

  /* Create FinanceContact API */
  createFinanceContact: async (req, res) => {
    const data = await DB.FINANCECONTACT.create(req.body);
    await financeContactEmail({ data })
    return apiResponse.OK({ res, message: messages.SUCCESS, data });
  },

  /* Get FinanceContact API */
  getFinanceContact: async (req, res) => {
    let { page, limit, skip, sortBy, sortOrder, search, ...query } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 100;
    sortBy = sortBy || "createdAt";
    sortOrder = sortOrder || -1;

    search ? query.$or = [
      { fname: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { reffrence: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ] : ""

    const data = await DB.FINANCECONTACT
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .lean();

    return apiResponse.OK({ res, message: messages.SUCCESS, data: { count: await DB.FINANCECONTACT.countDocuments(query), data: data } });
  },

  /* Update FinanceContact API*/
  updateFinanceContact: async (req, res) => {
    const update = await DB.FINANCECONTACT.findByIdAndUpdate(req.params._id, req.body, { new: true, });
    if (!update) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    return apiResponse.OK({ res, message: messages.SUCCESS });
  },

  /* Delete FinanceContact API*/
  deleteFinanceContact: async (req, res) => {
    if (!await DB.FINANCECONTACT.findOne({ _id: req.params._id })) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    await DB.FINANCECONTACT.findByIdAndDelete(req.params._id);

    return apiResponse.OK({ res, message: messages.SUCCESS });
  },
};