const { BasketDevice, Device } = require('../models/models');

class BasketDevicesService {
    // получить товары из корзины пользователя
    async getUserDevices({ basketId }) {
        const basket = await BasketDevice.findAndCountAll({
            where: { basketId },
        });
        return basket;
    }

    // добавить товар в корзину покупателя
    async addDeviceInBasket({ basketId, deviceId }) {
        const basket = await BasketDevice.create({ basketId, deviceId });
        return basket;
    }
}
module.exports = new BasketDevicesService();
