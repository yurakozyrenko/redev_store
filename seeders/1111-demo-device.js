'use strict';

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('devices', [
            {
                name: 'Sumsung123',
                price: 200,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 1,
            },
            {
                name: 'AtlantXT-1',
                price: 500,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 2,
            },
            {
                name: 'Витязь3000',
                price: 400,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 1,
            },
            {
                name: 'Panasonic22',
                price: 100,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 4,
            },
            {
                name: 'Iphone5',
                price: 100,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 5,
            },
            {
                name: 'Iphone6',
                price: 200,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 5,
            },
            {
                name: 'Iphone7',
                price: 300,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 5,
            },
        ]);
    },
    down: (queryInterface) => queryInterface.bulkDelete('devices', null, {}),
};
