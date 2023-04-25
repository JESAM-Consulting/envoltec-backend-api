const Joi = require("joi");
const validator = require("../../middleware/validator");
module.exports = {
    // multer file upload validation
    create: validator({
        body: Joi.object({
            fname: Joi.string().required(),
            lname: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            pincode: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            applyTo: Joi.string().required(),
            remark: Joi.string()
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
            phone: Joi.string(),
            pincode: Joi.string(),
            city: Joi.string(),
            street: Joi.string(),
            applyTo: Joi.string(),
            remark: Joi.string()
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