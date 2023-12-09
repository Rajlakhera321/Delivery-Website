const userSchema = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {omit} = require("lodash");

const createUser = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    const data = await userSchema.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      location
    })
    return res.status(201).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const generateToken = (user) => {
  return jwt.sign({
      data: user
  }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.EXPIRE_IN});
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userSchema.findOne({ email });

    if (!data) {
      return res.status(404).json({ message: "User not found or try logging with correct credentials" });
    }
    const comparedPassword = await bcrypt.compare(password, data.password);
    if (!comparedPassword) {
      return res.status(404).json({ message: "Incorrect password" });
    }
    const userData = omit(JSON.parse(JSON.stringify(data)),"password");
    return res.status(200).json({ message: "login success", token: generateToken(userData) });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
module.exports = { createUser, login };
