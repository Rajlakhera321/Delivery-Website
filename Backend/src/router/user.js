const express = require("express");
const route = express.Router();
const { createUser, login } = require("../controller/user");
const {signUpValidation} = require("../validator/signupValidate");
const {validate} = require("../validator/validate")

route.post("/newUser",signUpValidation, validate, createUser);

route.post("/login", login);

module.exports = route;
