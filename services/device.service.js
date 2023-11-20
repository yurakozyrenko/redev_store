const { Device, Category } = require('../models/models');
const { Op } = require('sequelize');

class DeviceInfosService {
    // Get All devices
    async getAllDevices({
        categoryId,
        minPrice,
        maxPrice,
        sort,
        order,
        limit,
        offset,
    }) {
        let devices;
        if (categoryId) {
            devices = await Device.findAndCountAll({
                where: {
                    categoryId,
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: [[`${sort}`, `${order}`]],
                limit,
                offset,
            });
        }

        if (!categoryId) {
            devices = await Device.findAndCountAll({
                where: {
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: [[`${sort}`, `${order}`]],
                limit,
                offset,
            });
        }
        return devices;
    }

    // Get device by id
    async getOneDevice({ id }) {
        const data = await Device.findOne({
            where: { id },
            include: [{ model: Category }],
        });
        return data;
    }

    // добавление нового товара в базу данных
    async createDevice({ name, price, categoryId, quantity, description }) {
        const newDevice = await Device.create({
            name,
            price,
            categoryId,
            quantity,
            description,
        });
        return newDevice;
    }

    // удаление товара из базы данных
    async deleteOneDevice({ id }) {
        const result = await Device.destroy({ where: { id } });
        return result;
    }

    // Обновить товар из базы данных
    async updateOneDevice({ name, price, categoryId, quantity, id }) {
        const result = await Device.update(
            { name, price, categoryId, quantity },
            { where: { id } }
        );
        return result;
    }
}
module.exports = new DeviceInfosService();
