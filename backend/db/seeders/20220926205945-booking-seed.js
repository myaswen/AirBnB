'use strict';

const { Spot, User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    const userOne = await User.findOne({
      where: { username: 'BillJoe' }
    });
    const userTwo = await User.findOne({
      where: { username: 'John2000' }
    });
    const userThree = await User.findOne({
      where: { username: 'Linda3k' }
    });

    const spotOne = await Spot.findOne({
      where: { name: "A Frame Retreat" }
    });
    const spotTwo = await Spot.findOne({
      where: { name: "Mountain Retreat" }
    });
    const spotThree = await Spot.findOne({
      where: { name: "Cabin in the woods" }
    });

    const startDateOne = new Date("2021-11-19");
    const endDateOne = new Date("2021-11-20");
    const endDateTwo = new Date("2021-11-21");
    const endDateThree = new Date("2021-11-22");

    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: spotOne.id,
        userId: userTwo.id,
        startDate: startDateOne,
        endDate: endDateOne,
      },
      {
        spotId: spotTwo.id,
        userId: userThree.id,
        startDate: startDateOne,
        endDate: endDateTwo,
      },
      {
        spotId: spotThree.id,
        userId: userOne.id,
        startDate: startDateOne,
        endDate: endDateThree,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Bookings', {
      startDate: startDateOne
    }, {});
  }
};
