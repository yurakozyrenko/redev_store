'use strict';

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('categories', [
            {
                name: 'Телевизоры',
            },
            {
                name: 'Холодильники',
            },
            {
                name: 'Кондиционеры',
            },
            {
                name: 'Пылесосы',
            },
            {
                name: 'Телефоны',
            },
        ]);
    },
    down: (queryInterface) => queryInterface.bulkDelete('categories', null, {}),
};
