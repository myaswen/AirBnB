'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Bill',
        lastName: 'Joe',
        email: 'billjoe@user.io',
        username: 'BillJoe',
        hashedPassword: bcrypt.hashSync('billspassword')
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
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('39gh16g4abjj255')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['BillJoe', 'John2000', 'Linda3k', 'Demo'] }
    }, {});
  }
};
