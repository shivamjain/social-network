// External Deps
const Joi = require("joi");

let PostSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(500).required()
});

module.exports = { PostSchema };