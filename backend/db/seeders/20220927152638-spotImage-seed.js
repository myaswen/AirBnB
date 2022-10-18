'use strict';

const { Spot } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    const spotOne = await Spot.findOne({
      where: { address: "1436 Scheuvront Drive" }
    });
    const spotTwo = await Spot.findOne({
      where: { address: "4577 Charter Street" }
    });
    const spotThree = await Spot.findOne({
      where: { address: "4786 Hiney Road" }
    });
    const spotFour = await Spot.findOne({
      where: { address: "1114 Branch Road" }
    });
    const spotFive = await Spot.findOne({
      where: { address: "4901 Point Street" }
    });
    const spotSix = await Spot.findOne({
      where: { address: "762 Duck Drive" }
    });
    const spotSeven = await Spot.findOne({
      where: { address: "2694 Parkway Street" }
    });
    const spotEight = await Spot.findOne({
      where: { address: "2567 Melody Lane" }
    });
    const spotNine = await Spot.findOne({
      where: { address: "3494 Boundary Street" }
    });
    const spotTen = await Spot.findOne({
      where: { address: "3008 Tetrick Road" }
    });

    return queryInterface.bulkInsert('SpotImages', [
      // Spot 1:
      {
        spotId: spotOne.id,
        url: 'https://a0.muscache.com/im/pictures/monet/Select-6603376/original/4fc04ea2-5689-44f5-b7ac-fc39ce8cc32e?im_w=1200',
        preview: true
      },
      {
        spotId: spotOne.id,
        url: 'https://a0.muscache.com/im/pictures/c5c8d7c1-eaca-41ce-8419-182bba91530c.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: spotOne.id,
        url: 'https://a0.muscache.com/im/pictures/e64051a2-e618-4e89-949a-30eea3b678d7.jpg?im_w=720',
        preview: false
      },
      {
        spotId: spotOne.id,
        url: 'https://a0.muscache.com/im/pictures/3b6a6c29-8402-4b7b-8f9e-23b9402416f4.jpg?im_w=720',
        preview: false
      },
      {
        spotId: spotOne.id,
        url: 'https://a0.muscache.com/im/pictures/05bc01d2-da3d-48ea-87e1-5bbd08adaa29.jpg?im_w=1200',
        preview: false
      },
      // Spot 2:
      {
        spotId: spotTwo.id,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-32241381/original/316f3d3b-6191-4b4c-9aa9-8f6608e3caa5.jpeg?im_w=1200',
        preview: true
      },
      // Spot 3:
      {
        spotId: spotThree.id,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-21605015/original/e914d980-5585-4fbe-a0ef-21b8d0b1cf8c.jpeg?im_w=1200',
        preview: true
      },
      // Spot 4:
      {
        spotId: spotFour.id,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-665478702415015675/original/44c4197d-2e82-47cb-a64d-04152dfd73b0.jpeg?im_w=1200',
        preview: true
      },
      // Spot 5:
      {
        spotId: spotFive.id,
        url: 'https://a0.muscache.com/im/pictures/8f4290bc-2128-44e1-b4f3-9c470c69dd95.jpg?im_w=1200',
        preview: true
      },
      // Spot 6:
      {
        spotId: spotSix.id,
        url: 'https://a0.muscache.com/im/pictures/7ef420b6-4c3e-463f-825f-3f59e252d369.jpg?im_w=1200',
        preview: true
      },
      // Spot 7:
      {
        spotId: spotSeven.id,
        url: 'https://a0.muscache.com/im/pictures/3fb69cb1-32dc-4b21-a0fd-ee3e081814ac.jpg?im_w=1200',
        preview: true
      },
      // Spot 8:
      {
        spotId: spotEight.id,
        url: 'https://a0.muscache.com/im/pictures/2e24b098-41ed-4d92-80c0-1e8d65bfbce4.jpg?im_w=1200',
        preview: true
      },
      // Spot 9:
      {
        spotId: spotNine.id,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49719893/original/12fcb7ad-dcf2-4721-84bf-eebd697d8be7.jpeg?im_w=1200',
        preview: true
      },
      // Spot 10:
      {
        spotId: spotTen.id,
        url: 'https://a0.muscache.com/im/pictures/63a21006-5525-4932-88bf-5d5e51d6eb9b.jpg?im_w=1200',
        preview: true
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      // url: 'image url'
      spotId: { [Op.in]: [spotOne.id, spotTwo.id, spotThree.id, spotFour.id, spotFive.id, spotSix.id, spotSeven.id, spotEight.id, spotNine.id, spotTen.id] }
    }, {});
  }
};
