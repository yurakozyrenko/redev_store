'use strict';

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('device_infos', [
            {
                title: 'Характеристики',
                description: 'Супер классный телевизор',
                createdAt: new Date(),
                updatedAt: new Date(),
                deviceId: 1,
            },
            {
                title: 'Характеристики',
                description: 'Современный холодильник',
                createdAt: new Date(),
                updatedAt: new Date(),
                deviceId: 2,
            },
            {
                title: 'Характеристики',
                description: 'Большая диагональ',
                createdAt: new Date(),
                updatedAt: new Date(),
                deviceId: 3,
            },
            {
                title: 'Характеристики',
                description: 'Самый мощный пылесос',
                createdAt: new Date(),
                updatedAt: new Date(),
                deviceId: 4,
            },
            {
                title: 'Характеристики',
                description: 'Отличный телефон',
                createdAt: new Date(),
                updatedAt: new Date(),
                deviceId: 5,
            },
            {
                title: 'Характеристики',
                description: 'Сочетание цена качество',
                createdAt: new Date(),
                updatedAt: new Date(),
                deviceId: 6,
            },
            {
                title: 'Характеристики',
                description: 'Отличная камера и звук',
                createdAt: new Date(),
                updatedAt: new Date(),
                deviceId: 7,
            },
        ]);
    },
    down: (queryInterface) =>
        queryInterface.bulkDelete('devices_infos', null, {}),
};
