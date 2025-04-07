const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const {
  requestSendController,
  requestReviewcontroller,
} = require("../controllers/requestController");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  requestSendController
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  requestReviewcontroller
);

module.exports = requestRouter;
