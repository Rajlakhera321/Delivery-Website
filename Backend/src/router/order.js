const express = require("express");
const route = express.Router();
const { orderData, myOrder } = require("../controller/orders");
const {ordereValidation} = require("../validator/orderValidate");
const {validate} = require("../validator/validate")

route.post('/orderData', orderData );

route.post('/myOrderData', myOrder );

module.exports = route;