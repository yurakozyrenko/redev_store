const { UserProfile, User } = require('../models/models');

class UserProfileService {
    // Получить профиль пользователя
    async getUserProfile({ userId }) {
        const userProfiles = await UserProfile.findOne({
            where: { userId },
            include: [{ model: User }],
        });
        return userProfiles;
    }

    // Создать профиль пользователя
    async createUserProfile({ name, adress, phone, userId }) {
        const userProfile = await UserProfile.create({
            name,
            adress,
            phone,
            userId,
        });
        return userProfile;
    }

    // Обновить профиль пользователя
    async updateUserProfile({ name, adress, phone, userId }) {
        const userProfile = await UserProfile.update(
            { name, adress, phone },
            { where: { userId } }
        );
        return userProfile;
    }

    // Удалить профиль пользователя
    async deleteUserProfile({ id }) {
        const result = await Device.destroy({ where: { id } });
        return result;
    }
}
module.exports = new UserProfileService();
