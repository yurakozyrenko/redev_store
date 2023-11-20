const { Device, Basket } = require('../models/models');

class BasketsService {
    // Получить корзину товаров
    async getBasket({ userId }) {
        const data = await Basket.findOne({
            where: { userId },
            include: Device,
        });
        return data;
    }
}
module.exports = new BasketsService();
