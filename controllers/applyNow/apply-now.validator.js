const Joi = require("joi");
const validator = require("../../middleware/validator");
module.exports = {
    create: validator({
        body: Joi.object({
            project: Joi.string(),
            userName: Joi.string().required(),
            postalCode: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            isSales: Joi.boolean().required(),
            workYears: Joi.string().required(),
        }),
    }),

    update: validator({
        body: Joi.object({
            project: Joi.string(),
            userName: Joi.string(),
            postalCode: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
            isSales: Joi.boolean(),
            workYears: Joi.string(),
            sms: Joi.boolean().allow(null, ""),
            contactedBy: Joi.string().allow(null, ""),
            contactedOn: Joi.string().allow(null, ""),
            contactedAgain: Joi.string().allow(null, ""),
            lastContact: Joi.string().allow(null, ""),
            emailFailed: Joi.boolean().allow(null, ""),
            reached: Joi.boolean().allow(null, ""),
            appointmentDate: Joi.string().allow(null, ""),
            appointmentTime: Joi.string().allow(null, ""),
            makeAppointment: Joi.string().allow(null, ""),
            usefulInformation: Joi.string().allow(null, ""),
            nichtGeeignet: Joi.boolean().allow(null, ""),
            color: Joi.string(),
            isActive: Joi.string(),
        }),
        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ID")
                .required(),
        }),
    }),

    toggleActive: validator({
        params: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ID")
                .required(),
        }),
    }),

    fetch: validator({
        query: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ID"),
            search: Joi.string(),
            project: Joi.string(),
            startDate: Joi.date(),
            endDate: Joi.date(),
            userName: Joi.string(),
            postalCode: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
            isSales: Joi.boolean(),
            workYears: Joi.string(),
            page: Joi.number().default(1),
            limit: Joi.number().default(100),
            sortBy: Joi.string().default("createdAt"),
            sortOrder: Joi.string().default(-1),
        }),
    }),
};