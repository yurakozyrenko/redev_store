require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'REDEV_STORE',
            version: '1.0.0',
            description:
                'Онлайн-магазин для продажи товаров с использованием API и реляционной базы данных.',
            contact: {
                name: 'Amazing Developer',
            },
            servers: ['http://localhost:5000'],
        },
    },
    apis: ['./routes/*js'],
};
app.use('/api', require('./routes/index'));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с БД было успешно установлено');
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e);
    }
};
start();
