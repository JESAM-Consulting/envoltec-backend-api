const messages = require("../../json/message.json");
const DB = require("../../models");
const apiResponse = require("../../utils/api.response");
const { USER_TYPE: { ADMIN } } = require("../../json/enums.json");
const { handleStatusColor } = require("../../script")
const csv = require('csvtojson');
const fs = require('fs');

/* APIS For ApplyNow */
module.exports = exports = {

  /* Create ApplyNow API */
  createApplyNow: async (req, res) => {

    if (!req.file?.path) return apiResponse.BAD_REQUEST({ res, message: messages.NOT_FOUND })

    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        let i = Object.keys(jsonObj[0])
        let validateKeys = [
          'id',
          'created_time',
          'ad_id',
          'ad_name',
          'adset_id',
          'adset_name',
          'campaign_id',
          'campaign_name',
          'form_id',
          'form_name',
          'is_organic',
          'platform',
          'bist_du_derzeit_berufstätig?',
          'wie_viel_vertriebserfahrung_hast_du?',
          'bitte_wähle_die_auf_dich_zutreffende_antwort_aus:_ich_bin_...',
          'beschreibe_in_wenigen_sätzen,_warum_du_energy_guide_der_energy_&_finance_werden_möchtest.',
          'first_name',
          'last_name',
          'phone_number',
          'email',
          'state'
        ]
        if (!i.every((v, i) => v === validateKeys[i])) {
          for (let j = 0; j < i.length; j++) {
            if (i[j] !== validateKeys[j]) {
              return apiResponse.BAD_REQUEST({ res, message: messages.INVALID_DATA + i[j] })
            }
          }
        }
        Promise.all(jsonObj.map(async (x) => {

          await DB.APPLYNOW.insertMany([
            {
              id: x['id'],
              createdTime: x['created_time'],
              adId: x['ad_id'],
              adName: x['ad_name'],
              adsetId: x['adset_id'],
              adsetName: x['adset_name'],
              campaignId: x['campaign_id'],
              campaignName: x['campaign_name'],
              formId: x['form_id'],
              formName: x['form_name'],
              isOrganic: x['is_organic'],
              plateform: x['plateform'],
              isEmployed: x['bist_du_derzeit_berufstätig?'],
              salesExperience: x['wie_viel_vertriebserfahrung_hast_du?'],
              answer: x['bitte_wähle_die_auf_dich_zutreffende_antwort_aus:_ich_bin_...'],
              description: x['beschreibe_in_wenigen_sätzen,_warum_du_energy_guide_der_energy_&_finance_werden_möchtest.'],
              fname: x['first_name'],
              lname: x['last_name'],
              email: x['email'],
              phone: x['phone_number'],
              state: x['state'],
            }
          ])
        })).then(() => {
          fs.unlinkSync(req.file.path, (err) => {
            if (err) return apiResponse.BAD_REQUEST({ res, message: err.message })
          })
          console.log("File deleted!")
        })
        return apiResponse.OK({ res, message: messages.SUCCESS })
      })
  },

  /* Get ApplyNow API */
  getApplyNow: async (req, res) => {
    let { page, limit, skip, sortBy, sortOrder, search, startDate, endDate, color, ...query } = req.body;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 100;
    sortBy = sortBy || "createdAt";
    sortOrder = sortOrder || -1;

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