const BasketsService = require('../services/basket.service');
const basketDeviceService = require('../services/basketDevice.service');
const ApiError = require('../error/ApiError');

class BasketController {
    // Поучить корзину пользователя
    async getOne(req, res, next) {
        try {
            const { id: userId } = req.user;
            const basket = await BasketsService.getBasket({ userId });
            return res.json(basket);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // добавить товар в корзину покупателя
    async addDevice(req, res, next) {
        try {
            const { id: basketId } = req.user;
            const { id: deviceId } = req.query;
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
