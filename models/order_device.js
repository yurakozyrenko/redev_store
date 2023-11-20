const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const OrderDevice = sequelize.define('order_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = { OrderDevice };
