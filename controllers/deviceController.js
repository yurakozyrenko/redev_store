// const uuid = require('uuid');
// const path = require('path');
const DevicesService = require('../services/device.service');
const ApiError = require('../error/ApiError');

class DeviceController {
    // добавление нового товара в базу данных
    async create(req, res, next) {
        try {
            const { name, price, categoryId } = req.body;

            // const { img } = req.files;
            // let fileName = uuid.v4() + '.jpg';
            // img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await DevicesService.createDevice({
                name,
                price,
                categoryId,
                // img: fileName,
            });

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Получить все товары
    async getAll(req, res, next) {
        try {
            let { categoryId, minPrice, maxPrice, sortPrice, sortDate, limit, page } =
                req.query;
            minPrice = minPrice || 0;
            maxPrice = maxPrice || 9999999999;
            page = page || 1;
            limit = limit || 6;
            let offset = page * limit - limit;
            const devices = await DevicesService.getAllDevices({
                categoryId,
                minPrice,
                maxPrice,
                sortPrice,
                sortDate,
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
            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params;
            const result = await DevicesService.deleteOneDevice({ id });
            res.json('Deleted');
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}
module.exports = new DeviceController();
