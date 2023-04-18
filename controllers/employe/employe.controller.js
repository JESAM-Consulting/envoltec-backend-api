const messages = require("../../json/message.json");
const DB = require("../../models");
const apiResponse = require("../../utils/api.response");
const { USER_TYPE: { ADMIN } } = require("../../json/enums.json");
const { handleStatusColor } = require("../../script")
const csv = require('csvtojson');
const fs = require('fs');

/* APIS For Employee */
module.exports = exports = {

  /* Create Employee API */
  createEmployee: async (req, res) => {

    if (!req.file?.path) return apiResponse.BAD_REQUEST({ res, message: messages.NOT_FOUND })

    csv().fromFile(req.file.path).then(async (jsonObj) => {
      for await (const i of jsonObj) {
        let fields = Object.keys(jsonObj[0])
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
          'bist_du_bereit_als_selbstständiger_energieberater_bei_der_envoltec_durchzustarten_und_durchschnittlich_112000_euro_pro_jahr_zu_verdienen?',
          'bist_du_derzeit_berufstätig?',
          'wie_viel_vertriebserfahrung_hast_du?',
          'bitte_wähle_die_auf_dich_zutreffende_antwort_aus_ich_bin',
          'first_name',
          'last_name',
          'phone_number',
          'email',
          'state'
        ]

        const missingField = fields.find(item => !validateKeys.includes(item))
        if (missingField) return apiResponse.BAD_REQUEST({ res, message: messages.INVALID_DATA + missingField });
      }

      csv().fromFile(req.file.path).then(async (jsonObj) => {
        Promise.all(jsonObj.map(async (x) => {
          await DB.EMPLOYE.insertMany([
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
              plateform: x['platform'],
              earn: x['bist_du_bereit_als_selbstständiger_energieberater_bei_der_envoltec_durchzustarten_und_durchschnittlich_112000_euro_pro_jahr_zu_verdienen?'],
              isEmployed: x['bist_du_derzeit_berufstätig?'],
              salesExperience: x['wie_viel_vertriebserfahrung_hast_du?'],
              answer: x['bitte_wähle_die_auf_dich_zutreffende_antwort_aus_ich_bin'],
              fname: x['first_name'],
              lname: x['last_name'],
              email: x['email'],
              phone: x['phone_number'],
              state: x['state'],
            }
          ])
        })).then(() => {
          fs.unlinkSync(req.file.path, (err) => {
            if (err) return apiResponse.BAD_REQUEST({ res, message: err.messages })
          })
          console.log("File deleted!")
        }).catch((eror) => {
          console.log("eror", eror)
          return apiResponse.CATCH_ERROR(res, eror.message);
        })
        return apiResponse.OK({ res, message: messages.SUCCESS});
      });
    });
  },

  /* Get Employee API */
  getEmployee: async (req, res) => {
    let { page, limit, skip, sortBy, sortOrder, search, startDate, endDate, color, ...query } = req.body;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 100;
    sortBy = sortBy || "createdAt";
    sortOrder = sortOrder || -1;

    search ? query.$or = [{ userName: { $regex: search, $options: "i" } }] : ""

    query = (startDate && endDate)
      ? { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate).setHours(23, 59, 59) } }
      : query;

    query = color ? { ...query, color: color } : query;

    const applyNows = await DB.EMPLOYE
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .lean();

    return apiResponse.OK({ res, message: messages.SUCCESS, data: { count: await DB.EMPLOYE.countDocuments(query), data: applyNows } });
  },

  /* Update Employee API*/
  updateEmployee: async (req, res) => {
    let { contactedOn, contactedAgain, lastContact, appointmentDate } = req.body;

    let applyNowExists = await DB.EMPLOYE.findOne({ _id: req.params._id, isActive: true });
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

    const update = await DB.EMPLOYE.findByIdAndUpdate(req.params._id, data, { new: true, });
    await handleStatusColor({ data: [update], models: DB.EMPLOYE })
    return apiResponse.OK({ res, message: messages.SUCCESS });
  },

  /* Delete Employee API*/
  deleteEmployee: async (req, res) => {
    if (!await DB.EMPLOYE.findOne({ _id: req.params._id })) return apiResponse.NOT_FOUND({ res, message: messages.NOT_FOUND });
    await DB.EMPLOYE.findByIdAndDelete(req.params._id);

    return apiResponse.OK({ res, message: messages.SUCCESS });
  },
};