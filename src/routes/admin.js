const express = require("express");
let router = express.Router();

const Registry = require("../misc/registry");
const Controller = require("../controller");

router.route("/").get(async (req, res) => {
	let ctr = new Controller.Admin(req, res);
	await ctr.executeMethod("dashboard");
});

router.route("/post").get(async (req, res) => {
	let ctr = new Controller.Admin(req, res);
	await ctr.executeMethod("post");
}).post(async (req, res) => {
	let ctr = new Controller.Admin(req, res);
	await ctr.executeMethod("post");
});

module.exports = router;