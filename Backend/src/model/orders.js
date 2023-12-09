const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    email: {
        type: String
    },
    order_data: {
        type: Array
    }
})

module.exports = model('order', orderSchema);