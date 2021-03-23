// External Deps
const _ = require("lodash");
const jwt = require("jsonwebtoken");

// Internal Deps
const Base = require("./base");
const Validation = require("../validations");
const Util = require("../misc/util");

const COOKIE_NAME = "_token";

class Auth extends Base {
	constructor(req, res) {
		super(req, res);

		this.user = null;

		this.beforeMethods = {
			login: ["_isLoggedIn"],
			register: ["_isLoggedIn"]
		};
		this.afterMethods = {};
	}

	__getPayload() {
		let payload = null;
		try {
			let token = this.req.cookies[COOKIE_NAME] ? this.req.cookies[COOKIE_NAME] : null;
			if (!token) {
				throw new Error("Token not found");
			}
			payload = jwt.verify(token, this.config.app.secret);
		} catch (error) {
			//console.log(error.message);
		}
		return payload;
	}

	async _isLoggedIn() {
		let payload = this.__getPayload();
		if (payload) {
			return this.res.redirect("/");
		}
	}

	async _secure() {
		let payload = this.__getPayload();
		if (!payload) {
			console.log("Payload null");
			return this.res.redirect("/auth/login");
		}
		//console.log(payload);
		let user = await this.models.User.findOne({ _id: payload.uid });
		if (!user) {
			this.res.redirect("/auth/login");
		}
		this.user = user;
	}

	__generateToken(user, seconds = 3600) {
		let payload = { uid: user._id };
		let options = { expiresIn: seconds };
		return jwt.sign(payload, this.config.app.secret, options);
	}

	async login() {
		let title = "Social Network | Login", errorMsg = "";
		if (this.req.method == "POST") {
			// Handle form submission
			let { error, value } = Validation.Auth.LoginSchema.validate(this.req.body);
			if (error) {
				//console.log(error);
				errorMsg = _.size(error.details) > 0 ? error.details[0].message : null;
			} else {
				// Cookie set and redirect to dashboard page
				try {
					let user = await this.models.User.findOne({ email: value.email });
					if (!user || !await user.verifyPassword(value.password)) {
						throw new Error("Incorrect Email/Password");
					}
					if (user.status != this.models.User.STATUS_ACTIVE) {
						throw new Error("Account not active");
					}
					console.log("User found");
					let seconds = 3600;
					let token = this.__generateToken(user, seconds);
					this.res.cookie("_token", token, {
						maxAge: seconds * 1000,
						secure: false,
						httpOnly: true,
						sameSite: "strict"
					});
					return this.res.redirect("/");
				} catch (error) {
					errorMsg = error.message;
				}
			}
		}
		this.res.render("auth/login", { layout: "standard", title, error: errorMsg });
	}

	async register() {
		let title = "Social Network | Register", errorMsg = "", successMsg = "";
		if (this.req.method == "POST") {
			// Handle form submission
			let { error, value } = Validation.Auth.RegisterSchema.validate(this.req.body);
			if (error) {
				console.log(error);
				errorMsg = _.size(error.details) > 0 ? error.details[0].message : null;
			} else {
				let user = await this.models.User.findOne({ email: value.email });
				if (!user) {
					// register
					user = new this.models.User({
						_id: Util.generateMongoId(),
						name: value.name,
						status: this.models.User.STATUS_ACTIVE,
						phone: value.phone,
						email: value.email,
						password: value.password,
						type: this.models.User.TYPE_ADMIN,
						dob: value.dob,
						gender: value.gender
					});
					const session = await this.models.User.startSession();
					session.startTransaction();
					try {
						await user.save({ session });
						await session.commitTransaction();
						successMsg = "User registered successfully.";
					} catch (error) {
						await session.abortTransaction();
						console.log(error);
						errorMsg = "User registration failed. Please try again after sometime.";
					}
					session.endSession();
				} else {
					errorMsg = "User already exists with the provided email address";
				}
			}
		}
		this.res.render("auth/register", {
			layout: "standard",
			title,
			error: errorMsg,
			success: successMsg,
			data: this.req.body
		});
	}

	async logout() {
		this.res.clearCookie(COOKIE_NAME);
		this.res.redirect("/auth/login");
	}
}

module.exports = Auth;