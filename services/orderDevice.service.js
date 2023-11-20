const { OrderDevice, BasketDevice } = require('../models/models');

class OrderDevicesService {
    // оформление заказа пользователя и очистка корзины

    async createOrderDevice({ devices, orderId, basketId }) {
        const array = devices.rows.map((el) => el.deviceId);

        array.map(async (element) => {
            let deviceId = element;
            await OrderDevice.create({ deviceId, orderId });
        });

        await BasketDevice.destroy({
            where: { basketId },
        });
    }
}
module.exports = new OrderDevicesService();
