const Router = require('express');
const router = new Router();
const DeviceController = require('../controllers/deviceController');

/**
 * @swagger
 * /api/device:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Добавление новых товаров в базу
 *      tags: [Devices]
 *      requestBody:
 *          required: true
 *          description: Title for new device.
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - name
 *                      - price
 *                      - categoryId
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: AtlantXT-1
 *                      price:
 *                        type: integer
 *                        example: 200
 *                      categoryId:
 *                        type: integer
 *                        example: 1
 *
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/DeviceItem"
 *          400:
 *              description: Bad request
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - success
 *                      - errors
 *                    properties:
 *                      success:
 *                        type: string
 *                        example: false
 *                      errors:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            msg:
 *                              type: string
 *                              example: Title должно быть строкой
 *                            param:
 *                              type: string
 *                              example: title
 *                            location:
 *                              type: string
 *                              example: body
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
 *          500:
 *              description: Some server err
 */
// Добавление товара в базу данных
router.post('/', DeviceController.create);

/**
 * @swagger
 * /api/device/:
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Получить все товары
 *      tags: [Devices]
 *      parameters:
 *        - in: query
 *          name: categoryId
 *          schema:
 *            type: integer
 *          description: Поиск товаров по категории
 *        - in: query
 *          name: minPrice
 *          schema:
 *            type: integer
 *          description: Поиск товаров от min price
 *        - in: query
 *          name: maxPrice
 *          schema:
 *            type: integer
 *          description: Поиск товаров до max price
 *        - in: query
 *          name: sortPrice
 *          schema:
 *            type: integer
 *          description: Сортировка по цене (1-возрастание, 2-убывание)
 *        - in: query
 *          name: sortDate
 *          schema:
 *            type: integer
 *          description: Сортировка по дате добавления 
 * 
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/DeviceItem"
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
// Получить все товары
router.get('/', DeviceController.getAll);

/**
 * @swagger
 * /api/device/{id}:
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Получить товар по id
 *      tags: [Devices]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric id of the user to get Device
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/DeviceItem"
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

// Получить товар по id
router.get('/:id', DeviceController.getOne);

router.delete('/:id', DeviceController.deleteOne);

module.exports = router;
