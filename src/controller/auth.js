const Base = require("./base");

class Auth extends Base {
	constructor(req, res) {
		super(req, res);

		this.beforeMethods = {
			login: ["TestLoginBefore","TestLoginB4_2"]
		};
		this.afterMethods = {
			login: ["TestLoginAfter"]
		};
	}

	async TestLoginBefore() {
		console.log("TestLoginBefore function executed before login");
	}

    async TestLoginB4_2() {
		console.log("TestLoginB4_2 function executed before login");
	}

	async TestLoginAfter() {
		console.log("TestLoginAfter function executed after login");
	}

	async login() {
		this.res.json({ msg: "Login Route access" });
	}

	async register() {}
}

module.exports = Auth;
