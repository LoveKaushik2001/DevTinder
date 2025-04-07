const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { viewProfileController, editProfileController } = require("../controllers/profileController");

profileRouter.get("/profile/view", userAuth, viewProfileController);
profileRouter.patch("/profile/edit", userAuth, editProfileController);

module.exports = profileRouter;