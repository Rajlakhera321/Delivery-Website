const express = require("express");
const { getItems } = require("../controller/foodItems");
const router = express.Router();

router.get("/foodData", getItems);

module.exports = router;