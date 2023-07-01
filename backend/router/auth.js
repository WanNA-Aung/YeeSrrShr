const express = require("express");
const router = express.Router();

// Controller
const {SignUp, SignIn} = require("./../controller/auth")

// Login 
router.post("/sign-in", SignIn)

// SignUp
router.post("/sign-up", SignUp)



// Google Authentication 
router.post("/g-auth")



// Facebook Authentication
router.post("/f-auth")

module.exports = router;