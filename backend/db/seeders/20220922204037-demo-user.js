'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John',
        lastName: 'Conner',
        email: 'john@user.io',
        username: 'John2000',
        hashedPassword: bcrypt.hashSync('johnspassword')
      },
      {
        firstName: 'Linda',
        lastName: 'Hamilton',
        email: 'linda@user.io',
        username: 'Linda3k',
        hashedPassword: bcrypt.hashSync('lindaspassword')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo', 'John2000', 'Linda3k'] }
    }, {});
  }
};
