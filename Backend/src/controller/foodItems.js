const foodSchema = require("../model/footItems");
const foodCategorySchema = require("../model/foodCategories");

const getItems = async (req, res) => {
    try {
        const food_items = await foodSchema.find();
        const food_categories = await foodCategorySchema.find();
        return res.status(200).json({message: "Data fetched successfully", items: food_items, categories: food_categories});
    } catch (error) {
        return res.status(400).json({message: "Internal Server Error"});
    }
}

module.exports = {getItems}