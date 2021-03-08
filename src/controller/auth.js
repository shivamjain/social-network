const Base = require("./base");
const Validation = require("../validations");

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
		let title = "Social Nettwork | Login", errorMsg = "";
		if (this.req.method == "POST") {
			//Handle form submission
			let { error, value } = Validation.Auth.LoginSchema.validate(this.req.body);
			if (error) {
				//console.log(error);
				errorMsg = error;
			} else {
				//console.log(value);
				let user = await this.models.User.findOne({ email: value.email });
				if(user && user.verifyPassword(value.password)){
					console.log("User Found");
					//redirect
				}else{
					errorMsg = "Invalid Email/Password";
				}
			}
		}
		this.res.render("auth/login", { layout: "standard", title, error: errorMsg });
	}

	async register() { }
}

module.exports = Auth;
