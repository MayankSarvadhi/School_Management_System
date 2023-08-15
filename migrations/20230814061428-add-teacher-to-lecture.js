'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('lectureDetails', 'TeacherId', {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'userInformations',
                key: 'id'
            }
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
