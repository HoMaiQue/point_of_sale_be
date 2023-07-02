const category = require("../models/category.model");
const { unGetSelectData } = require("../utils");
class CategoryService {
    static async getAllCategory() {
        const unSelect = ["__v", "createdAt", "updatedAt"];
        const categoryList = await category
            .find({})
            .select(unGetSelectData(unSelect))
            .lean();
        return categoryList;
    }
    static async createCategory(payload) {
        const { category_name } = payload;
        const newCategory = await category.create({ category_name });

        return newCategory;
    }
}

module.exports = CategoryService;
