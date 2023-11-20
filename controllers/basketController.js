const BasketsService = require('../services/basket.service');
const basketDeviceService = require('../services/basketDevice.service');
const ApiError = require('../error/ApiError');
const DeviceService = require('../services/device.service');

class BasketController {
    // Получить корзину пользователя
    async getOne(req, res, next) {
        try {
            const { id: userId } = req.user;
            const basket = await BasketsService.getBasket({
                userId,
            });
            return res.json(basket);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // добавить товар в корзину покупателя
    async addDevice(req, res, next) {
        try {
            const { id: basketId } = req.user;
            const { id } = req.query;
            const candidate = await DeviceService.getOneDevice({ id });
            if (!candidate) {
                return next(ApiError.badRequest('Device не найден'));
            }
            const deviceId = id;
            const basket = await basketDeviceService.addDeviceInBasket({
                basketId,
                deviceId,
            });
            return res.json(basket);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BasketController();
