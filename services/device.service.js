const { Device, Category } = require('../models/models');
const { Op } = require('sequelize');

class DeviceInfosService {

    // Get All devices
    async getAllDevices({
        categoryId,
        minPrice,
        maxPrice,
        sortPrice,
        sortDate,
        limit,
        offset,
    }) {
        // const candidate = await Category.findOne({ where: { id: categoryId } });
        // if (!candidate) {
        //     throw new Error('Category was not found');
        // }

        let devices;
        if (!categoryId && !sortPrice && !sortDate) {
            devices = await Device.findAndCountAll({
                where: {
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                limit,
                offset,
            });
        }
        if (categoryId && !sortPrice && !sortDate) {
            devices = await Device.findAndCountAll({
                where: {
                    categoryId,
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                limit,
                offset,
            });
        }

        if (!categoryId && sortPrice == 2 && !sortDate) {
            devices = await Device.findAndCountAll({
                where: {
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: [['price', 'DESC']],
                limit,
                offset,
            });
        }

        if (!categoryId && sortPrice == 1 && !sortDate) {
            devices = await Device.findAndCountAll({
                where: {
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: ['price'],
                limit,
                offset,
            });
        }

        if (categoryId && sortPrice == 2 && !sortDate) {
            devices = await Device.findAndCountAll({
                where: {
                    categoryId,
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: [['price', 'DESC']],
                limit,
                offset,
            });
        }
        if (categoryId && sortPrice == 1 && !sortDate) {
            devices = await Device.findAndCountAll({
                where: {
                    categoryId,
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: ['price'],
                limit,
                offset,
            });
        }

        if (!categoryId && sortPrice == 2 && sortDate == 2) {
            devices = await Device.findAndCountAll({
                where: {
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: [['price', 'DESC']],
                order: [['createdAt', 'DESC']],
                limit,
                offset,
            });
        }

        if (!categoryId && sortPrice == 2 && sortDate == 1) {
            devices = await Device.findAndCountAll({
                where: {
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: [['price', 'DESC']],
                order: ['createdAt'],
                limit,
                offset,
            });
        }

        if (!categoryId && sortPrice == 1 && sortDate == 2) {
            devices = await Device.findAndCountAll({
                where: {
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: ['price'],
                order: [['createdAt', 'DESC']],
                limit,
                offset,
            });
        }

        if (!categoryId && sortPrice == 1 && sortDate == 1) {
            devices = await Device.findAndCountAll({
                where: {
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: ['price'],
                order: ['createdAt'],
                limit,
                offset,
            });
        }

        if (categoryId && sortPrice == 2 && sortDate == 2) {
            devices = await Device.findAndCountAll({
                where: {
                    categoryId,
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: [['price', 'DESC']],
                order: [['createdAt', 'DESC']],
                limit,
                offset,
            });
        }

        if (categoryId && sortPrice == 2 && sortDate == 1) {
            devices = await Device.findAndCountAll({
                where: {
                    categoryId,
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: [['price', 'DESC']],
                order: ['createdAt'],
                limit,
                offset,
            });
        }

        if (categoryId && sortPrice == 1 && sortDate == 2) {
            devices = await Device.findAndCountAll({
                where: {
                    categoryId,
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: ['price'],
                order: [['createdAt', 'DESC']],
                limit,
                offset,
            });
        }

        if (categoryId && sortPrice == 1 && sortDate == 1) {
            devices = await Device.findAndCountAll({
                where: {
                    categoryId,
                    price: { [Op.between]: [minPrice, maxPrice] },
                },
                order: ['price'],
                order: ['createdAt'],
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
        if (!data) {
            throw new Error('Device was not found');
        }
        return data;
    }

    // добавление нового товара в базу данных
    async createDevice({ name, price, categoryId, img: fileName }) {
        const candidate = await Category.findOne({ where: categoryId });
        if (!candidate) {
            throw new Error('Category was not found');
        }
        const newDevice = await Device.create({
            name,
            price,
            categoryId,
            // img: fileName,
        });
        return newDevice;
    }

    async deleteOneDevice({ id }) {
        const result = await Device.destroy({ where: { id } });
        if (!result) {
            throw new Error('Device was not found');
        }
        return result;
    }
}
module.exports = new DeviceInfosService();
