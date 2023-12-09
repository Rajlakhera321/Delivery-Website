const { check } = require("express-validator");
const userModel = require("../model/orders");
const orderValidationRule = () => {
  return [
    check("order_Data")
      .trim()
      .notEmpty()
      .withMessage("order is required"),
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .normalizeEmail()
      .isEmail()
      .withMessage("must be a valid email")
      .custom(async (value) => {
        const data = await userModel.findOne({ email: value });
        if (data) {
          return Promise.reject("Email is already exist");
        }
      }),
  ];
};

const ordereValidation = orderValidationRule();
module.exports = { ordereValidation };