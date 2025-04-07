const { sendRequest, reviewRequest } = require("../services/requestService");

const requestSendController = async (req, res) => {
  try {
    const response = await sendRequest(req);
    res.json(response);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

const requestReviewcontroller = async (req, res) => {
  try {
    const data = await reviewRequest(req);
    res.json({ message: "Connection request " + req.params?.status, data });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = { requestSendController, requestReviewcontroller };
