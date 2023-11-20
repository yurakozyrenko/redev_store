const DevicesService = require('../services/device.service');
const { validationResult } = require('express-validator');
const ApiError = require('../error/ApiError');
const CategoryService = require('../services/category.service');

class DeviceController {
    // добавление нового товара в базу данных
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, price, categoryId, quantity, description } = req.body;

            const candidate = await CategoryService.getOneCategory({
                categoryId,
            });
            if (!candidate)
                return next(
                    ApiError.badRequest('Category c таким id не существует')
                );

            const device = await DevicesService.createDevice({
                name,
                price,
                categoryId,
                quantity,
                description,
            });

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    // Получить все товары
    async getAll(req, res, next) {
        try {
            const {
                categoryId,
                minPrice = 0,
                maxPrice = 999999,
                sort = 'id',
                order = 'ASC',
                limit = 4,
                page = 1,
            } = req.query;

            const offset = page * limit - limit;
            const devices = await DevicesService.getAllDevices({
                categoryId,
                minPrice,
                maxPrice,
                sort,
                order,
                limit,
                offset,
            });
            return res.json(devices);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Get device by id
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const device = await DevicesService.getOneDevice({ id });
            if (!device) {
                return next(
                    ApiError.badRequest('Device с таким id не существует')
                );
            }
            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Delete device by id
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const device = await DevicesService.getOneDevice({ id });
            if (!device) {
                return next(
                    ApiError.badRequest('Device с таким id не существует')
                );
            }
            const result = await DevicesService.deleteOneDevice({ id });
            res.json(`Device id = ${id} was deleted`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Update device by id
    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const device = await DevicesService.getOneDevice({ id });
            if (!device) {
                return next(
                    ApiError.badRequest('Device с таким id не существует')
                );
            }

            const {
                name = device.name,
                price = device.price,
                categoryId = device.categoryId,
                quantity = device.quantity,
            } = req.body;

            const updateDevice = await DevicesService.updateOneDevice({
                name,
                price,
                categoryId,
                quantity,
                id,
            });

            const result = await DevicesService.getOneDevice({ id });

            res.json(result);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new DeviceController();
