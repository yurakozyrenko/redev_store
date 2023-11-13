const { Order, Device, Status } = require('../models/models');

class OrdersService {
    //История заказов пользователя
    async getAllOrders({ limit, offset, userId }) {
        const orders = await Order.findAndCountAll({
            where: { userId },
            include: Device,
            limit,
            offset,
        });
        return orders;
    }

    // Просмотреть заказ пользователя по id
    async getOneOrderById({ id, userId }) {
        const data = await Order.findOne({
            where: { id, userId },
            include: Status,
        });
        return data;
    }
    
    // Создать заказ пользователя
    async createOrder({ userId }) {
        const newOrder = await Order.create({
            userId,
        });
        return newOrder;
    }

    async deleteOneDevice({ id }) {
        const result = await Device.destroy({ where: { id } });
        return result;
    }
}
module.exports = new OrdersService();
