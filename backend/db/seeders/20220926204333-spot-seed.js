'use strict';

const { User } = require('../models');

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

    return queryInterface.bulkInsert('Spots', [
      // Spot 1:
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
      // Spot 2:
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
      // Spot 3:
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
      },
      // Spot 4:
      {
        ownerId: userThree.id,
        address: "1114 Branch Road",
        city: "Sea Ranch",
        state: "California",
        country: "United States of America",
        lat: 38.7152,
        lng: 123.4545,
        name: "Industrial Design in Nature",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 364,
      },
      // Spot 5:
      {
        ownerId: userThree.id,
        address: "4901 Point Street",
        city: "Watsonville",
        state: "California",
        country: "United States of America",
        lat: 36.9102,
        lng: 121.7569,
        name: "Ocean Front Views",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 980,
      },
      // Spot 6:
      {
        ownerId: userThree.id,
        address: "762 Duck Drive",
        city: "Santa Cruz",
        state: "California",
        country: "United States of America",
        lat: 36.9741,
        lng: 122.0308,
        name: "Cozy By The Beach",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 300,
      },
      // Spot 7:
      {
        ownerId: userThree.id,
        address: "2694 Parkway Street",
        city: "Terlingua",
        state: "Texas",
        country: "United States of America",
        lat: 29.3216,
        lng: 103.6160,
        name: "Adobe Dome",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 111,
      },
      // Spot 8:
      {
        ownerId: userThree.id,
        address: "2567 Melody Lane",
        city: "Williams",
        state: "Arizona",
        country: "United States of America",
        lat: 35.2495,
        lng: 112.1910,
        name: "Tiny A-Frame Camping",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 199,
      },
      // Spot 9:
      {
        ownerId: userThree.id,
        address: "3494 Boundary Street",
        city: "Oakhurst",
        state: "California",
        country: "United States of America",
        lat: 37.3280,
        lng: 119.6493,
        name: "Luxury Estate on a River",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 995,
      },
      // Spot 10:
      {
        ownerId: userThree.id,
        address: "3008 Tetrick Road",
        city: "Portland",
        state: "Oregon",
        country: "United States of America",
        lat: 45.5152,
        lng: 122.6784,
        name: "Modern Tranquility",
        description: "Relax and enjoy yourself at this unique stay. The home is architecturally inspired with fine details hidden in every corner. There's space to stretch out and disconnect from the world, or reconnect with family and friends. There is ample room for activities, inside and out, and lots of attractions nearby to explore if you feel adventurous. There's always something to do, or nothing to do, depending on your goal. I hope you enjoy your stay!",
        price: 150,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      ownerId: { [Op.in]: [userOne.id, userTwo.id, userThree.id] }
    }, {});
  }
};
