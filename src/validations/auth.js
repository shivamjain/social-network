// External Deps
const Joi = require("joi").extend(require('@joi/date'));

let LoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(32).required()
});

let RegisterSchema = Joi.object({
	name: Joi.string().required().min(3).max(50),
	email: Joi.string().email().required(),
	phone: Joi.string().length(10).required(),
	password: Joi.string().min(8).max(32).required(),
	dob: Joi.date().format("YYYY-MM-DD").required(),
	gender: Joi.string().valid('male', 'female', 'others').required()
});

module.exports = {
    LoginSchema,
	RegisterSchema
}