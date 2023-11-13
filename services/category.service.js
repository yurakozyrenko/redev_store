const { Category } = require('../models/models');

class CategoriesService {
    //Создать новую категорию товаров
    async createCategory({ name }) {
        const newCategory = await Category.create({
            name,
        });
        return newCategory;
    }

    //Получить все категории товаров
    async getAllCategories({ limit, offset }) {
        const categories = await Category.findAndCountAll({ limit, offset });
        return categories;
    }

    async deleteOneCategory({ id }) {
        const result = await Category.destroy({ where: { id } });
        return result;
    }
}
module.exports = new CategoriesService();
