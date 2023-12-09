const {Schema, model} = require("mongoose");

const categorySchema = new Schema({
    CategoryName : {
        type: String
    }
})

module.exports = model('food_categories', categorySchema);