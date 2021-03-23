const _ = require("lodash");
const { Schema } = require("mongoose");
const option = require("./common/option");

const STATUS_ACTIVE = "active", STATUS_PENDING = "pending", STATUS_DISABLED = "disabled", STATUS_DELETED = "deleted";
const STATUS_ENUM = [STATUS_ACTIVE, STATUS_PENDING, STATUS_DISABLED, STATUS_DELETED];

const TYPE_ADMIN = "admin", TYPE_MEMBER = "member";
const TYPE_ENUM = [ TYPE_ADMIN, TYPE_MEMBER];

const GENDER_MALE = "male", GENDER_FEMALE = "female", GENDER_OTHERS = "others";
const GENDER_ENUM = [ GENDER_MALE, GENDER_FEMALE, GENDER_OTHERS];

let schema = new Schema({
	_id: {
		type: Schema.ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		bcrypt: true,
		required: true
	},
	status: {
		type: String,
		enum: STATUS_ENUM,
		default: STATUS_PENDING
	},
	type: {
		type: String,
		enum: TYPE_ENUM,
		default: TYPE_ADMIN
	},
	phone: {
		type: String,
		default: null
	},
	dob: {
		type: Date,
		required: true
	},
	gender: {
		type: String,
		enum: GENDER_ENUM,
		required: true
	}
}, _.merge({ collection: "users" }, option));
schema.plugin(require("mongoose-bcrypt"));

schema.statics.STATUS_ACTIVE = STATUS_ACTIVE;
schema.statics.STATUS_PENDING = STATUS_PENDING;
schema.statics.STATUS_DISABLED = STATUS_DISABLED;
schema.statics.STATUS_DELETED = STATUS_DELETED;

schema.statics.TYPE_ADMIN = TYPE_ADMIN;
schema.statics.TYPE_MEMBER = TYPE_MEMBER;

module.exports = schema;