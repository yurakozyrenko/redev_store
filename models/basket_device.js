const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = { BasketDevice };
