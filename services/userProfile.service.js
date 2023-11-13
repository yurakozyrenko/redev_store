const { UserProfile, User } = require('../models/models');

class UserProfileService {

    // Получить профиль пользователя
    async getUserProfile({ userId }) {
        const userProfiles = await UserProfile.findOne({
            where: { userId },
            include: [{ model: User }]
        });
        return userProfiles;
    }

    async getOneUserProfile({ id }) {
        const userProfile = await UserProfile.findOne({ where: { id } });
        return userProfile;
    }

    // Создаем профиль пользователя
    async createUserProfile({ name, adress, phone, userId }) {
        const userProfile = await UserProfile.create({
            name,
            adress,
            phone,
            userId,
        });
        return userProfile;
    }

    async deleteOneDevice({ id }) {
        const result = await Device.destroy({ where: { id } });
        return result;
    }
}
module.exports = new UserProfileService();
