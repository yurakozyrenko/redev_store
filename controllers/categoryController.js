const CategoriesService = require('../services/category.service');
const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator');

class CategoryController {
    //Создать новую категорию товаров
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name } = req.body;
            const category = await CategoriesService.createCategory({
                name,
            });
            return res.json(category);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    //Get all categories
    async getAll(req, res) {
        const { limit = 4, page = 1 } = req.query;
        const offset = page * limit - limit;
        const categories = await CategoriesService.getAllCategories({
            limit,
            offset,
        });
        return res.json(categories);
    }

    // async delete(req, res) {
    //     const { id } = req.params;
    //     const result = await CategoriesService.deleteOneCategory({ id });
    //     if (!result) {
    //         return res.json('Не найден');
    //     }
    //     return res.json('Удалено');
    // }
}

module.exports = new CategoryController();
