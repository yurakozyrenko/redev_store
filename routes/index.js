const Router = require('express');
const router = new Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            description: email
 *          password:
 *            type: string
 *            description: password
 *        example:
 *            email: example@example.com
 *            password: CatCat
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      DeviceItem:
 *        type: object
 *        required:
 *          - name
 *          - price
 *          - categoryId
 *          - quantity
 *        properties:
 *          name:
 *            type: string
 *            description: name
 *          price:
 *            type: integer
 *            description: price
 *          categoryId:
 *            type: integer
 *            description: id
 *        example:
 *            name: Sumsung123
 *            price: 200
 *            categoryId: 1
 *            quantity: 1
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      CategoryItem:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *            description: name
 *        example:
 *            id: 1
 *            name: Мониторы
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      OrderItem:
 *        type: object
 *        example:
 *            id: 1
 *            userId: 1
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      UserProfileItem:
 *        type: object
 *        required:
 *          - name
 *          - adress
 *          - phone
 *        properties:
 *          name:
 *            type: string
 *            description: name
 *          adress:
 *            type: string
 *            description: adress
 *          phone:
 *            type: string
 *            description: phone
 *        example:
 *            name: Юрий
 *            adress: Минск
 *            phone: 911
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      BasketItem:
 *        type: object
 *        example:
 *            id: 1
 *            userId: 1
 *            devices: []
 */

const userRouter = require('./User.routes');
const categoryRouter = require('./Category.routes');
const deviceRouter = require('./Device.routes');
const orderRouter = require('./Order.routes');
const statusRouter = require('./Status.routes');
const basketRouter = require('./Basket.routes');

router.use('/basket', basketRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/device', deviceRouter);
router.use('/order', orderRouter);
router.use('/statusRouter', statusRouter);

module.exports = router;
