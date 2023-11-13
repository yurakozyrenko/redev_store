const Router = require('express');
const router = new Router();
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
router.post('/login', UserController.login);

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
router.post('/registration', UserController.registration);

router.get('/auth', authMiddleware, UserController.check);

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
//Обновить информацию о пользователе
router.post('/userProfile', authMiddleware, UserController.createUserProfile);

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
 *                          $ref: '#/components/schemas/UserProfile'
 *          500:
 *              description: Some server err
 */
//Получить информацию о пользователе
router.get('/userProfile', authMiddleware, UserController.getUserProfile);

module.exports = router;
