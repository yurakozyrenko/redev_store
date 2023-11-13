// const uuid = require('uuid');
// const path = require('path');
const DevicesService = require('../services/device.service');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, categoryId } = req.body;
            const device = await DevicesService.createDevice({
                name,
                price,
                categoryId,
            });

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { categoryId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 6;
        let offset = page * limit - limit;
        const devices = await DevicesService.getAllDevices({
            categoryId,
            limit,
            offset,
        });
        return res.json(devices);
    }

    async getOne(req, res) {
        const { deviceId } = req.params;
        console.log(deviceId);
        const deviceInfo = await DevicesService.getOneDevice({ deviceId });
        return res.json(deviceInfo);
    }

    async deleteOne(req, res) {
        const { id } = req.params;
        const result = await DevicesService.deleteOneDevice({ id });
        if (!result) {
            return res.json('такого устройства не существует');
        }
        res.json('удалено');
    }
}

module.exports = new DeviceController();
