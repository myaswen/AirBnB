'use strict';

const { User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    const foundUser = await User.findByPk(1);

    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: foundUser.id,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ["App Academy"] }
    }, {});
  }
};
