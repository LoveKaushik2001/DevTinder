const { validateEditProfileData } = require("../utils/validation");
const editProfile = async (req) => {
  if (!validateEditProfileData(req)) {
    throw new Error("Invalid Edit Request");
  }
  const loggedInUser = req.user;
  Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
  await loggedInUser.save();
  return loggedInUser;
};

module.exports = { editProfile };
