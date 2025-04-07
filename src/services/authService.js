const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

const addUser = async (req) => {
  validateSignUpData(req);
  const { firstName, lastName, emailId, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
  const data = await user.save();
  return data;
};

const userLogin = async (req) => {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid Credentials");
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
        const token = await user.getJWT();
        return token;
    } else {
        throw new Error("Invalid Credentials");
    }
}

module.exports = { 
    addUser,
    userLogin
}