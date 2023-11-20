const Router = require('express');
const router = new Router();
const { checkSchema } = require('express-validator');
const { nameSchema } = require('../helpers/validation');
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
 *          description: Add New device.
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - name
 *                      - price
 *                      - categoryId
 *                      - quantity
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: AtlantXT-1
 *                      price:
 *                        type: integer
 *                        example: 100
 *                      categoryId:
 *                        type: integer
 *                        example: 1
 *                      quantity:
 *                        type: integer
 *                        example: 2
 *                      description:
 *                        type: string
 *                        example: Very good device
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
 *                              example: name должно быть строкой
 *                            param:
 *                              type: string
 *                              example: name
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
router.post('/', checkSchema(nameSchema), DeviceController.create);

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
 *
 *        - in: query
 *          name: sort
 *          schema:
 *            type: string
 *          description: Сортировка по столбцу (price, quanity)
 *
 *        - in: query
 *          name: order
 *          schema:
 *            type: string
 *          description: Сортировка ASC - низкая-высокая, DESC - высокая-низкая
 *
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
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
 *              description: The device by id was not found
 *          500:
 *              description: Some server err
 */

// Получить товар по id
router.get('/:id', DeviceController.getOne);

/**
 * @swagger
 * /api/device/{id}:
 *  delete:
 *      security:
 *      - bearerAuth: []
 *      summary: Удалить товар по id
 *      tags: [Devices]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric id to delete device
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
 *              description: Device by id was not found
 *          500:
 *              description: Some server err
 */

// Получить товар по id
router.delete('/:id', DeviceController.deleteOne);

/**
 * @swagger
 * /api/device/{id}:
 *  patch:
 *      security:
 *      - bearerAuth: []
 *      summary: Обновить товар по id
 *      tags: [Devices]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric id to update device
 *      requestBody:
 *          required: true
 *          description: Update information device
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/DeviceItem'
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
 *              description: Device by id was not found
 *          500:
 *              description: Some server err
 */

// Обновить товар по id
router.patch('/:id', DeviceController.updateOne);

module.exports = router;
