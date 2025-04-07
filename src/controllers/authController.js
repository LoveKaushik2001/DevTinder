const { addUser, userLogin } = require("../services/authService");
const signupController = async (req, res) => {
  try {
    const data = await addUser(req);
    res.status(201).send({ data, message: "User added Successfully" });
  } catch (error) {
    res.status(400).send({ message: "ERROR : " + error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const token = await userLogin(req);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send({ message: "Login Successful!!!" });
  } catch (error) {
    res.status(400).send({ message: "ERROR : " + error.message });
  }
};

const logoutController = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
};

module.exports = { signupController, loginController, logoutController };
