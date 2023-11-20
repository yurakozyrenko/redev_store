const OrdersService = require('../services/order.service');
const BasketDevicesService = require('../services/basketDevice.service');
const OrderDevicesService = require('../services/orderDevice.service');
const UserProfileService = require('../services/userProfile.service');
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

            const userProfiles = await UserProfileService.getUserProfile({
                userId,
            });
            if (!userProfiles) {
                return next(
                    ApiError.badRequest(
                        'Информация о пользователе не найдена! Для создания заказа перейди в профиль и заполни данные'
                    )
                );
            }
            const newOrder = await OrdersService.createOrder({ userId });

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
            const { limit = 4, page = 1 } = req.query;
            const offset = page * limit - limit;
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
            if (!order) {
                return next(ApiError.badRequest('Заказ не найден'));
            }
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Оплатиь заказ пользователя по id
    async updateOne(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { id } = req.query;

            const order = await OrdersService.getOneOrderById({
                id,
                userId,
            });

            if (!order) {
                return next(ApiError.badRequest('Заказ не найден'));
            }

            if (order.statusId != 1) {
                return next(ApiError.badRequest('Заказ уже оплачен'));
            }
            const updateOrder = await OrdersService.updateOneOrder({
                id,
                userId,
            });
            return res.json(
                `Order ${id} was payment succes, complete to delivery`
            );
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Оплатить заказ пользователя по id
    async updateOne(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { id } = req.query;

            const order = await OrdersService.getOneOrderById({
                id,
                userId,
            });

            if (!order) {
                return next(ApiError.badRequest('Заказ не найден'));
            }

            if (order.statusId != 1) {
                return next(ApiError.badRequest('Заказ уже оплачен'));
            }
            const updateOrder = await OrdersService.updateOneOrder({
                id,
                userId,
            });
            return res.json(
                `Order ${id} was payment succes, complete to delivery`
            );
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new OrderController();
