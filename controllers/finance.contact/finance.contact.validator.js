const Joi = require("joi");
const validator = require("../../middleware/validator");
module.exports = {
    // multer file upload validation
    create: validator({
        body: Joi.object({
            fname: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().required(),
            reffrence: Joi.string().required(),
            description: Joi.string(),
        })
    }),

    fetch: validator({
        query: Joi.object({
            _id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ID"),
            search: Joi.string(),
            page: Joi.number().default(1),
            limit: Joi.number().default(100),
            sortBy: Joi.string().default("createdAt"),
            sortOrder: Joi.string().default("-1"),
        }),
    }),

    update: validator({
        body: Joi.object({
            fname: Joi.string(),
            lname: Joi.string(),
            email: Joi.string(),
            reffrence: Joi.string(),
            description: Joi.string(),
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
};