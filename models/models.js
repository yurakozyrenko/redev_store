const { Basket } = require('./basket');
const { BasketDevice } = require('./basket_device');
const { Category } = require('./category');
const { Device } = require('./device');
const { OrderDevice } = require('./order_device');
const { Order } = require('./order');
const { UserProfile } = require('./user_profile');
const { User } = require('./user');
const { Status } = require('./status');

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

Category.hasMany(Device);
Device.belongsTo(Category);

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.belongsToMany(Device, { through: BasketDevice });
Device.belongsToMany(Basket, { through: BasketDevice });

Device.belongsToMany(Order, { through: OrderDevice });
Order.belongsToMany(Device, { through: OrderDevice });

Status.hasMany(Order);
Order.belongsTo(Status);

module.exports = {
    Basket,
    BasketDevice,
    Category,
    Device,
    OrderDevice,
    Order,
    UserProfile,
    User,
    Status,
};
