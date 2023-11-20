const Router = require('express');
const router = new Router();
const { checkSchema } = require('express-validator');
const {
    registerSchema,
    nameSchema,
    userProfileSchema,
} = require('../helpers/validation');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      summary: Check user in system
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          description: Check email and password
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - email
 *                      - password
 *                    properties:
 *                      email:
 *                        type: string
 *                        example: example@example.com
 *                      password:
 *                        type: string
 *                        example: CatCat
 *      responses:
 *          200:
 *              description: The user was successfully registration
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - token
 *                    properties:
 *                      token:
 *                        type: string
 *                        example: i132nro2iu3br2u3bro2i3ro233nfwdfwef434f34f34f3
 *          401:
 *              description: Проблемы с аутентификацией или авторизацией
 *          500:
 *              description: Some server err
 */
// авторизация пользователя
router.post('/login', checkSchema(registerSchema), UserController.login);

/**
 * @swagger
 * /api/user/registration:
 *  post:
 *      summary: Registration a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          description: Register a new user
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: The user was successfully registration
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Some server err
 */
//Регистрация пользователя
router.post(
    '/registration',
    checkSchema(registerSchema),
    UserController.registration
);

// router.get('/auth', authMiddleware, UserController.check);

/**
 * @swagger
 * /api/user/userProfile:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Add information user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          description: Add information user
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/UserProfileItem'
 *      responses:
 *          200:
 *              description: The user was successfully registration
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserProfileItem'
 *          500:
 *              description: Some server err
 */
//Создать информацию о пользователе
router.post(
    '/userProfile',
    checkSchema(nameSchema),
    checkSchema(userProfileSchema),
    authMiddleware,
    UserController.createUserProfile
);

/**
 * @swagger
 * /api/user/userProfile:
 *  patch:
 *      security:
 *      - bearerAuth: []
 *      summary: Update information user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          description: Update information user
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/UserProfileItem'
 *      responses:
 *          200:
 *              description: The user was successfully registration
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserProfileItem'
 *          500:
 *              description: Some server err
 */

//Редактировать информацию о пользователе
router.patch('/userProfile', authMiddleware, UserController.updateUserProfile);

/**
 * @swagger
 * /api/user/userProfile:
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Get information user
 *      tags: [User]
 *      responses:
 *          200:
 *              description: The user was successfully registration
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserProfileItem'
 *          500:
 *              description: Some server err
 */
//Получить информацию о пользователе
router.get('/userProfile', authMiddleware, UserController.getUserProfile);

module.exports = router;
