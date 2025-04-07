const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { receivedRequestController, getConnectionsController } = require("../controllers/userController");

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, receivedRequestController);
// Get all connections
userRouter.get("/user/connections", userAuth, getConnectionsController);
module.exports = userRouter;