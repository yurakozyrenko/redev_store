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
                quantity: 4,
                description: 'Very good'
            },
            {
                name: 'AtlantXT-1',
                price: 500,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 2,
                quantity: 2,
                description: 'Very good'
            },
            {
                name: 'Витязь3000',
                price: 400,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 1,
                quantity: 3,
                description: 'Very good'
            },
            {
                name: 'Panasonic22',
                price: 100,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 4,
                quantity: 6,
                description: 'Very good'
            },
            {
                name: 'Iphone5',
                price: 100,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 5,
                quantity: 1,
                description: 'Very good'
            },
            {
                name: 'Iphone6',
                price: 200,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 5,
                quantity: 1,
                description: 'Very good'
            },
            {
                name: 'Iphone7',
                price: 300,
                // img: '123.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 5,
                quantity: 2,
                description: 'Very good'
            },
        ]);
    },
    down: (queryInterface) => queryInterface.bulkDelete('devices', null, {}),
};
