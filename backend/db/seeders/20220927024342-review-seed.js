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

    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: spotOne.id,
        userId: userTwo.id,
        review: "This was a great spot!",
        stars: 4
      },
      {
        spotId: spotTwo.id,
        userId: userThree.id,
        review: "Not much to do.",
        stars: 3
      },
      {
        spotId: spotThree.id,
        userId: userOne.id,
        review: "I was robbed, literally.",
        stars: 1
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      userId: { [Op.in]: [userTwo.id, userThree.id, userOne.id] }
    }, {});
  }
};
