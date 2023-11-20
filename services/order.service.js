const { Order, Device, Status } = require('../models/models');

class OrdersService {
    //История заказов пользователя
    async getAllOrders({ limit, offset, userId, statusId = 4 }) {
        const orders = await Order.findAndCountAll({
            where: { userId, statusId },
            include: Device,
            limit,
            offset,
        });
        return orders;
    }

    // Получить заказ пользователя по id
    async getOneOrderById({ id, userId }) {
        const data = await Order.findOne({
            where: { id, userId },
            include: Status,
        });
        return data;
    }

    // Создать заказ пользователя
    async createOrder({ userId, statusId = 1 }) {
        const newOrder = await Order.create({ userId, statusId });
        return newOrder;
    }

    // Оплатить заказ пользователя
    async updateOneOrder({ id, userId, statusId = 2 }) {
        const updateOrder = await Order.update(
            { statusId },
            { where: { userId, id } }
        );
        return updateOrder;
    }

    async deleteOneDevice({ id }) {
        const result = await Device.destroy({ where: { id } });
        return result;
    }
}
module.exports = new OrdersService();
