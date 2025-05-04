const express = require("express")
const router = express.Router();
const authenticationController = require("../controller/authentication.controller")

router.post('/login',authenticationController.login )

module.exports = router;