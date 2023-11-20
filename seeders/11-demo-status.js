'use strict';

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('statuses', [
            {
                orderStatus: 'unpaid',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                orderStatus: 'paid',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                orderStatus: 'delivery',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                orderStatus: 'complete',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: (queryInterface) => queryInterface.bulkDelete('statuses', null, {}),
};
