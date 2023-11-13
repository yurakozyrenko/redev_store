const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const UserProfile = sequelize.define('user_profile', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    adress: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
});

const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    price: { type: DataTypes.INTEGER, allowNull: false },
    // img: { type: DataTypes.STRING, allowNull: false },
});

const DeviceInfo = sequelize.define('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

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

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const OrderDevice = sequelize.define('order_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// const Status = sequelize.define('status', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, defaultValue: false },
// });

// const OrderStatus = sequelize.define('order_status', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

Category.hasMany(Device);
Device.belongsTo(Category);

Device.hasMany(DeviceInfo);
DeviceInfo.belongsTo(Device);

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.belongsToMany(Device, { through: BasketDevice });
Device.belongsToMany(Basket, { through: BasketDevice });

Device.belongsToMany(Order, { through: OrderDevice });
Order.belongsToMany(Device, { through: OrderDevice });

module.exports = {
    User,
    Basket,
    BasketDevice,
    Category,
    Device,
    DeviceInfo,
    Order,
    OrderDevice,
    UserProfile,
};
