// External Deps
const _ = require("lodash");

// Internal Deps
const Base = require("./base");
const Validation = require("../validations");
const Util = require("../misc/util");

class Auth extends Base {
	constructor(req, res) {
		super(req, res);

		this.beforeMethods = {
			//login: ["TestLoginBefore", "TestLoginB4_2"]
		};
		this.afterMethods = {
			//login: ["TestLoginAfter"]
		};
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
				let user = await this.models.User.findOne({ email: value.email });
				if (user && await user.verifyPassword(value.password)) {
					// redirect
					console.log("User Found");
				} else {
					errorMsg = "Incorrect Email/Password";
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
				//console.log(error);
				errorMsg = _.size(error.details) > 0 ? error.details[0].message : null;
			} else {
				let user = await this.models.User.findOne({ email: value.email });
				if (!user) {
					// register
					let org = new this.models.Organization({
						_id: Util.generateMongoId(),
						name: value.companyName,
						status: this.models.Organization.STATUS_ACTIVE
					});
					user = new this.models.User({
						_id: Util.generateMongoId(),
						orgId: org._id,
						name: value.name,
						status: this.models.User.STATUS_ACTIVE,
						phone: value.phone,
						email: value.email,
						password: value.password,
						type: this.models.User.TYPE_ADMIN
					});
					const session = await this.models.User.startSession();
					session.startTransaction();
					try {
						await org.save({ session });
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
}

module.exports = Auth;