'use strict';

const { Spot, User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    const userOne = await User.findOne({
      where: { username: 'Demo' }
    });
    const userTwo = await User.findOne({
      where: { username: 'John2000' }
    });
    const userThree = await User.findOne({
      where: { username: 'Linda3k' }
    });

    const spotOne = await Spot.findOne({
      where: { name: "App Academy" }
    });
    const spotTwo = await Spot.findOne({
      where: { name: "John's house" }
    });
    const spotThree = await Spot.findOne({
      where: { name: "Linda's house" }
    });

    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: spotOne.id,
        userId: userTwo.id,
        startDate: "2021-11-19",
        endDate: "2021-11-20",
      },
      {
        spotId: spotTwo.id,
        userId: userThree.id,
        startDate: "2021-11-19",
        endDate: "2021-11-21",
      },
      {
        spotId: spotThree.id,
        userId: userOne.id,
        startDate: "2021-11-19",
        endDate: "2021-11-22",
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', {
      startDate: "2021-11-19"
    }, {});
  }
};
