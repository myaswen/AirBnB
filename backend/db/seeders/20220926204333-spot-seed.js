'use strict';

const { User } = require('../models');

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

    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: userOne.id,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created.",
        price: 123,
      },
      {
        ownerId: userTwo.id,
        address: "4577 Charter Street",
        city: "Gardner",
        state: "Kansas",
        country: "United States of America",
        lat: 38.649098,
        lng: -99.109018,
        name: "John's house",
        description: "The house where John resides.",
        price: 123,
      },
      {
        ownerId: userThree.id,
        address: "4786 Hiney Road",
        city: "Las Vegas",
        state: "Nevada",
        country: "United States of America",
        lat: 36.152671,
        lng: -115.464318,
        name: "Linda's house",
        description: "The house where Linda resides.",
        price: 123,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ["App Academy", "John's house", "Linda's House"] }
    }, {});
  }
};
