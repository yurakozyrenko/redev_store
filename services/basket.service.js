const { Basket, Device, User } = require('../models/models');

class BasketsService {
    // Получить корзину товаров
    async getBasket({ userId }) {
        const data = await Basket.findAndCountAll({
            where: { userId },
            include: Device,
        });
        return data;
    }
}
module.exports = new BasketsService();
