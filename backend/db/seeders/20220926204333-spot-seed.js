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
        address: "1436 Scheuvront Drive",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.6062,
        lng: 122.3321,
        name: "A Frame Retreat",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 516,
      },
      {
        ownerId: userTwo.id,
        address: "4577 Charter Street",
        city: "Big Sky",
        state: "Montana",
        country: "United States of America",
        lat: 45.2618,
        lng: 111.3080,
        name: "Mountain Retreat",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 414,
      },
      {
        ownerId: userThree.id,
        address: "4786 Hiney Road",
        city: "Occidental",
        state: "California",
        country: "United States of America",
        lat: 38.4077,
        lng: 122.9477,
        name: "Cabin in the woods",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 400,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      // name: { [Op.in]: ["A Frame Retreat", "Mountain Retreat", "Cabin in the woods"] }
      ownerId: { [Op.in]: [userOne.id, userTwo.id, userThree.id] }
    }, {});
  }
};
