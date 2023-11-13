const { OrderDevice, BasketDevice } = require('../models/models');

class OrderDevicesService {
    // оформление заказа пользователя и очистка корзины
    async createOrderDevice({ devices, orderId, basketId }) {
        const arr = devices.rows.map((el) => el.deviceId);
        for (let i = 0; i < arr.length; i++) {
            let deviceId = arr[i];
            await OrderDevice.create({ deviceId, orderId });
        }
        await BasketDevice.destroy({
            where: { basketId },
        });

        //     async deleteOneDevice({ id }) {
        //         const result = await DeviceDevice.destroy({ where: { id } });
        //         return result;
        //     }
    }
}
module.exports = new OrderDevicesService();
