const express = require("express");
const Registry = require("../misc/registry");
const Controller = require("../controller");
let router = express.Router();

router.get("/auth/test", (req, res) => {
	// res.json({
	//     msg: "ok tested",
	//     environment: Registry.get("env")
	// });
	res.render("auth/login", {
		layout: "standard",
		msg: "ok tested",
		title: "Social Network App"
	});
});

router.route("/auth/login").get(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("login");
}).post(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("login");
});

router.route("/auth/register").get(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("register");
}).post(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("register");
});

router.get("/auth/logout", (req, res) => {});

module.exports = router;
