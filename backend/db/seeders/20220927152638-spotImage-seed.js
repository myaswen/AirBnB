'use strict';

const { Spot } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    const spotOne = await Spot.findOne({
      where: { name: "App Academy" }
    });
    const spotTwo = await Spot.findOne({
      where: { name: "John's house" }
    });
    const spotThree = await Spot.findOne({
      where: { name: "Linda's house" }
    });

    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: spotOne.id,
        url: 'image url',
        preview: true
      },
      {
        spotId: spotTwo.id,
        url: 'image url',
        preview: false
      },
      {
        spotId: spotThree.id,
        url: 'image url',
        preview: false
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SpotImages', {
      url: 'image url'
    }, {});
  }
};
