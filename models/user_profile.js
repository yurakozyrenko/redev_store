const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const UserProfile = sequelize.define('user_profile', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    adress: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { UserProfile };
