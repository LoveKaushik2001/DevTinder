const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
const receivedRequests = async (req) => {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    return connectionRequests;
}

const getConnections = async (req) => {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        $or: [
            { toUserId: loggedInUser._id, status: "accepted" },
            { fromUserId: loggedInUser._id, status: "accepted" }
        ]
    }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
            return row.toUserId;
        }
        return row.fromUserId; 
    })
    return data;
}

const getFeedData = async (req) => {
    const loggedInUser = req.user;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 1;
    limit = limit > 50 ? 50 : limit;
    page = page < 1 ? 1 : page;
    const connectionRequests = await ConnectionRequest.find({
        $or: [
            { toUserId: loggedInUser._id },
            { fromUserId: loggedInUser._id }
        ]
    }).select("fromUserId toUserId").populate("fromUserId", "firstName").populate("toUserId" ,"firstName");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach(req => {
        hideUsersFromFeed.add(req.fromUserId).toString();
        hideUsersFromFeed.add(req.toUserId).toString();
    });
    const skip = (page -1) * limit;
    const users = await User.find({
        $and: [{_id: { $nin: Array.from(hideUsersFromFeed) }}, { _id: { $ne: loggedInUser._id } }]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    return users;
}

module.exports = { receivedRequests, getConnections, getFeedData };