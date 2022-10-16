'use strict';

const { Spot } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    const spotOne = await Spot.findOne({
      where: { name: "A Frame Retreat" }
    });
    const spotTwo = await Spot.findOne({
      where: { name: "Mountain Retreat" }
    });
    const spotThree = await Spot.findOne({
      where: { name: "Cabin in the woods" }
    });

    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: spotOne.id,
        url: 'https://a0.muscache.com/im/pictures/monet/Select-6603376/original/4fc04ea2-5689-44f5-b7ac-fc39ce8cc32e?im_w=1200',
        preview: true
      },
      {
        spotId: spotTwo.id,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-32241381/original/316f3d3b-6191-4b4c-9aa9-8f6608e3caa5.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: spotThree.id,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-21605015/original/e914d980-5585-4fbe-a0ef-21b8d0b1cf8c.jpeg?im_w=1200',
        preview: true
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      // url: 'image url'
      spotId: { [Op.in]: [spotOne.id, spotTwo.id, spotThree.id] }
    }, {});
  }
};
