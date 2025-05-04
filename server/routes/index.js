const express = require('express');
const router = express.Router();
const eventRoutes = require("./event.route");
const authentication = require("../controller/authentication.controller");



router.use("/events",authentication.verify,eventRoutes);

router.use("/users",require("./user.route"))
router.use("/authentication",require("./authentication.route"))




module.exports =router;