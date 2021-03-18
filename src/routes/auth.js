const express = require("express");
let router = express.Router();

const Registry = require("../misc/registry");
const Controller = require("../controller");

router.get("/test", (req, res) => {
	res.json({ status: "ok tested", Environment: Registry.get("env") });
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

router.route("/auth/logout").get(async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.executeMethod("logout");
});

module.exports = router;
