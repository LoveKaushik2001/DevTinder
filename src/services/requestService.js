const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { Types } = require('mongoose');
const sendRequest = async (req) => {
    const fromUserId = req.user._id;
    const toUserId = new Types.ObjectId(req.params?.toUserId || '');
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status type: " + status);
    }
    const toUser = await User.findById(toUserId);
    if (!toUser) {
        throw new Error("User not found!");
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
        ]
    });
    if (existingConnectionRequest) {
        throw new Error("Connection Request Already Exist");
    }
    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    })
    const data = await connectionRequest.save();
    return { data, message: req.user.firstName + " is " + req.params.status + " in " + toUser.firstName };
}

const reviewRequest = async (req) => {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
        throw new Error("Status not found");
    }
    const convertedRequestId = new Types.ObjectId(requestId || '')
    const connectionRequest = await ConnectionRequest.findOne({
        _id: convertedRequestId,
        toUserId: loggedInUser._id,
        status: "interested"
    });
    if (!connectionRequest) {
        throw new Error("Connection request not found");
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    return data;
}

module.exports = { sendRequest, reviewRequest };