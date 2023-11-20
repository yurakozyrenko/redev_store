const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Status = sequelize.define('status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderStatus: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Status };
