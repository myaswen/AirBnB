'use strict';

// const { Spot, User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    // const foundSpot = await Spot.findByPk(1);
    // const foundUser = await User.findByPk(2);

    // const foundSpot = await Spot.findOne({
    //   where: { name: 'App Academy' }
    // });

    // const foundUser = await User.findOne({
    //   where: { username: 'Demo' }
    // });

    return queryInterface.bulkInsert('Bookings', [
      {
        // spotId: foundSpot.id,
        // userId: foundUser.id,
        spotId: 1,
        userId: 2,
        startDate: "2021-11-19",
        endDate: "2021-11-20",
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', {
      startDate: "2021-11-19"
    }, {});
  }
};
