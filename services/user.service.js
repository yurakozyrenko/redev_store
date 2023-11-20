const { User, Basket } = require('../models/models');

class UsersService {
    // Получить пользователя
    async getUser({ email }) {
        const candidate = await User.findOne({ where: { email } });
        return candidate;
    }
    // Создать пользователя
    async createUser({ email, role, password: hashPassword }) {
        const user = await User.create({
            email,
            role,
            password: hashPassword,
        });

        await Basket.create({ userId: user.id });
        return user;
    }
}
module.exports = new UsersService();
