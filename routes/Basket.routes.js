const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const BasketController = require('../controllers/basketController');

/**
 * @swagger
 * /api/basket:
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Get user basket
 *      tags: [Basket]
 *      description: Returns user basket
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/BasketItem"
 *          401:
 *              description: Unauthorized Error
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - message
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: Для работы нужен токен
 *          404:
 *              description: The user basket was not found
 *          500:
 *              description: Some server err
 */
// Получить корзину пользователя
router.get('/', authMiddleware, BasketController.getOne);

/**
 * @swagger
 * /api/basket/add:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Add device in my basket
 *      tags: [Basket]
 *      description: Returns devices array
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: integer
 *          description: id Device to get user
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/BasketItem"
 *          401:
 *              description: Unauthorized Error
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - message
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: Для работы нужен токен
 *          404:
 *              description: The users by age was not found
 *          500:
 *              description: Some server err
 */
// Добавить товар в корзину пользователя
router.post('/add', authMiddleware, BasketController.addDevice);

module.exports = router;
