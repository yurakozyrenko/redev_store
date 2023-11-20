const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = { Order };
