const Base = require("./base");

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
		if(this.req.method == "POST"){
			console.log(this.req.body);
		}
		this.res.render('auth/login',{ msg: "Login Route access", type: this.req.method });
	}

	async register() {}
}

module.exports = Auth;
