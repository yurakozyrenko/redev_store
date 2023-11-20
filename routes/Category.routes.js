const Router = require('express');
const router = new Router();
const { checkSchema } = require('express-validator');
const { nameSchema } = require('../helpers/validation');
const CategoryController = require('../controllers/categoryController');
const checkRole = require('../middleware/checkRoleMiddleware');

/**
 * @swagger
 * /api/category:
 *  post:
 *      security:
 *      - bearerAuth: []
 *      summary: Create a new category
 *      tags: [Categories]
 *      description: Create a new category.
 *      requestBody:
 *          required: true
 *          description: Title for new category.
 *          content:
 *              application/json:
 *                  schema:
 *                    type: object
 *                    required:
 *                      - name
 *                    properties:
 *                      name:
 *                        type: string
 *                        example: Мониторы
 *      responses:
 *          200:
 *              description: Success response
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/CategoryItem"
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
//Создать новую категорию товаров
router.post(
    '/',
    checkSchema(nameSchema),
    // checkRole('ADMIN'),
    CategoryController.create
);

/**
 * @swagger
 * /api/category:
 *  get:
 *      security:
 *      - bearerAuth: []
 *      summary: Get all categories
 *      tags: [Categories]
 *      description: Returns categories array
 *      parameters:
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
 *                      $ref: "#/components/schemas/CategoryItem"
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
//Получить все категории товаров
router.get('/', CategoryController.getAll);

// router.delete('/:id', checkRole('ADMIN'), CategoryController.delete);

module.exports = router;
