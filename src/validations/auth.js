// External Deps
const Joi = require("joi");

let LoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(32).required()
});

module.exports = {
    LoginSchema
}