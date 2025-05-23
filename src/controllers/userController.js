const { receivedRequests, getConnections, getFeedData } = require("../services/userService");

const receivedRequestController = async (req, res) => {
    try {
        const data = await receivedRequests(req);
        res.json({ data, message: "Data fetched successfully" });
    } catch (error) {
        req.status(400).send("ERROR : ", error.message);
    }
}

const getConnectionsController = async (req, res) => {
    try {
        const data = await getConnections(req);
        res.status(200).json({ data, message: "All connection for : " + req.user.emailId });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const feedController = async (req, res) => {
    try {
        const data = await getFeedData(req);
        res.status(200).send({ data, message: "Feed Data" })
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = { receivedRequestController, getConnectionsController, feedController };