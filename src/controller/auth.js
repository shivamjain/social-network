const Base = require("./base");

class Auth extends Base {
	constructor(req, res) {
		super(req, res);
	}

	_isLoggedIn() {}

	async login() {
		this.res.json({ msg: "Login Route" });
	}

	async register() {}
}

module.exports = Auth;
