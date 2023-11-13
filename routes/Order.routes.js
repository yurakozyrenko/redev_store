const Router = require('express');
const router = new Router();
const OrderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/order/:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Create new order
 *      tags: [Orders]
 *      description: Create new order
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/OrderItem"
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
 *              description: Order user was not found
 *          500:
 *              description: Some server err
 */
//Оформление заказа 
router.post('/', authMiddleware, OrderController.create);

/**
 * @swagger
 * /api/order/:
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Get all user orders
 *      tags: [Orders]
 *      description: Returns array orders
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/OrderItem"
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
//История заказов
router.get('/', authMiddleware, OrderController.getAll);

/**
 * @swagger
 * /api/order/{id}:
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Get user order
 *      tags: [Orders]
 *      description: Returns order
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric id of the user to get Order
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/OrderItem"
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
// Просмотреть заказ по id
router.get('/:id', authMiddleware, OrderController.getOne);

module.exports = router;
