const OrdersService = require('../services/order.service');
const BasketDevicesService = require('../services/basketDevice.service');
const OrderDevicesService = require('../services/orderDevice.service');
const ApiError = require('../error/ApiError');

class OrderController {
    // оформление заказа пользователя и очистка корзины
    async create(req, res, next) {
        try {
            const { id: userId } = req.user;
            const basketId = userId;
            const devices = await BasketDevicesService.getUserDevices({
                basketId,
            });
            if (!devices.rows.length) {
                return next(ApiError.badRequest('Корзина пуста'));
            }
            const newOrder = await OrdersService.createOrder({
                userId,
            });
            const { id: orderId } = newOrder;
            await OrderDevicesService.createOrderDevice({
                devices,
                orderId,
                basketId,
            });
            return res.json(newOrder);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    //История заказов пользователя
    async getAll(req, res, next) {
        try {
            const { id: userId } = req.user;
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 6;
            let offset = page * limit - limit;
            const orders = await OrdersService.getAllOrders({
                userId,
                limit,
                offset,
            });
            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Просмотреть заказ пользователя по id
    async getOne(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { id } = req.query;
            const order = await OrdersService.getOneOrderById({
                id,
                userId,
            });
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new OrderController();
