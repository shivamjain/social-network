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
		environment: Registry.get("env"),
	});
});

router.get("/auth/login", async (req, res) => {
	let ctr = new Controller.Auth(req, res);
	await ctr.login();
});

router.post("/auth/register", (req, res) => {});

router.get("/auth/logout", (req, res) => {});

module.exports = router;
