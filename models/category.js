const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Category = sequelize.define(
    'category',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
        timestamps: false,
    }
);

module.exports = {Category};