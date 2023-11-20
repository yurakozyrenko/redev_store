const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator');
const UsersService = require('../services/user.service');
const bcrypt = require('bcrypt');
const UserProfileService = require('../services/userProfile.service');
const { generateJwt } = require('../helpers/generateJwt');

class UserController {
    //Регистрация пользователя
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, role } = req.body;
            if (!email || !password) {
                return next(
                    ApiError.badRequest('Некорректный email или password')
                );
            }
            const candidate = await UsersService.getUser({ email });
            if (candidate) {
                return next(
                    ApiError.badRequest('Пользователь с таким email существует')
                );
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await UsersService.createUser({
                email,
                role,
                password: hashPassword,
            });
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // авторизация пользователя
    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;

            const user = await UsersService.getUser({ email });

            if (!user) {
                return next(ApiError.internal('Пользователь не найден'));
            }
            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.internal('Указанн неверный пароль '));
            }
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }

    //Создать Информация пользователя
    async createUserProfile(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { id: userId } = req.user;
            const { name, adress, phone } = req.body;
            const candidate = await UserProfileService.getUserProfile({
                userId,
            });
            if (candidate) {
                return next(
                    ApiError.badRequest('Информация о пользователе существует')
                );
            }
            const device = await UserProfileService.createUserProfile({
                name,
                adress,
                phone,
                userId,
            });

            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    //Изменить информацию пользователя
    async updateUserProfile(req, res, next) {
        try {
            const { id: userId } = req.user;
            const candidate = await UserProfileService.getUserProfile({
                userId,
            });
            if (!candidate) {
                return next(
                    ApiError.badRequest(
                        'Информация о пользователе не существует'
                    )
                );
            }
            const {
                name = candidate.name,
                adress = candidate.adress,
                phone = candidate.phone,
            } = req.body;

            const updateUserProfile =
                await UserProfileService.updateUserProfile({
                    name,
                    adress,
                    phone,
                    userId,
                });

            const userProfile = await UserProfileService.getUserProfile({
                userId,
            });

            return res.json(userProfile);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    //Получить информацию о пользователе
    async getUserProfile(req, res, next) {
        try {
            const { id: userId } = req.user;
            const userProfiles = await UserProfileService.getUserProfile({
                userId,
            });
            if (!userProfiles) {
                return next(
                    ApiError.badRequest(
                        'Информация о пользователе не найдена'
                    )
                );
            }
            return res.json(userProfiles);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();
