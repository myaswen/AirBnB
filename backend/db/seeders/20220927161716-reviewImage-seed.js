'use strict';

const { Review } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    const reviewOne = await Review.findOne({
      where: { review: "This was a great spot!" }
    });
    const reviewTwo = await Review.findOne({
      where: { review: "Not much to do." }
    });
    const reviewThree = await Review.findOne({
      where: { review: "I was robbed, literally." }
    });

    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: reviewOne.id,
        url: 'review image url'
      },
      {
        reviewId: reviewTwo.id,
        url: 'review image url'
      },
      {
        reviewId: reviewThree.id,
        url: 'review image url'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ReviewImages', {
      url: 'review image url'
    }, {});
  }
};
