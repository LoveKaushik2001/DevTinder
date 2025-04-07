const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const { signupController, loginController, logoutController } = require("../controllers/authController");

authRouter.post("/signup",validateSignUpData, signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

module.exports = authRouter;