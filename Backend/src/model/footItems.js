const {Schema, model} = require("mongoose");

const foodSchema = new Schema({
    CategoryName: {
        type: String
    },
    name: {
        type: String
    },
    img: {
        type: String
    },
    options: [{
        half: {
            type: Number
        },
        full: {
            type: Number
        }
    }],
    description: {
        type: String
    }
})

module.exports = model('food_items', foodSchema);