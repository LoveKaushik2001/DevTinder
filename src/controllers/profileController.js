const { editProfile } = require("../services/profileService");
const viewProfileController = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ data: user, message: "Profile of user found" });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

const editProfileController = async (req, res) => {
  try {
    const updatedUserData = await editProfile(req);
    res.json({
      message: `${updatedUserData.firstName}, your profile updated successfuly`,
      data: updatedUserData,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

module.exports = { viewProfileController, editProfileController };
