const validator = require("validator");

const validateSignUpData = async (req, res, next) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const validationErrors = [
      { condition: !firstName || !lastName, message: "Name is not valid!" },
      { condition: !validator.isEmail(emailId), message: "Email is not valid!" },
      { condition: !validator.isStrongPassword(password), message: "Please enter a strong Password!" },
    ];
    for (let error of validationErrors) {
      switch (true) {
        case error.condition:
          throw new Error(error.message);
      }
    }
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};