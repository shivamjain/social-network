const _ = require("lodash");
const { Schema } = require("mongoose");
const option = require("./common/option");

const schema = new Schema({
    _id: {
        type: Schema.ObjectId,
        required: true
    },
    title: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 500,
        required: true
    },
    userId: {
        type: Schema.ObjectId,
        required: true
    }
}, _.merge({ collection: "posts" }, option));

module.exports = schema;