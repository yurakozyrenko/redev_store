// const { OrderStatus } = require('../models/models');

// class UserProfileService {
//     async getUserProfile({ userId }) {
//         const userProfiles = await UserProfile.findOne({ where: { userId } });
//         return userProfiles;
//     }

//     async getOneUserProfile({ id }) {
//         const  userProfile = await UserProfile.findOne({ where: { id } });
//         return userProfile;
//     }

//     async createUserProfile({ adress, phone, userId }) {
//         const userProfile = await UserProfile.create({
//             adress,
//             phone,
//             userId,
//         });

//         return userProfile;
//     }

//     async deleteOneDevice({ id }) {
//         const result = await Device.destroy({ where: { id } });
//         return result;
//     }
// }
// module.exports = new UserProfileService();
