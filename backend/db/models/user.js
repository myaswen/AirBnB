'use strict';

const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Method to convert User instance to a 'safe' object:
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this; // context will be the User instance
      return { id, firstName, lastName, username, email };
    }

    // Method to compare user's entered password to user's stored password:
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    // Method to find user data by id:
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    // Login method:
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    // Signup method:
    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 30],
        isCapitalized(value) {
          if (value[0].toUpperCase() !== value[0]) {
            throw new Error("Must be capitalized.");
          }
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2, 30],
        isCapitalized(value) {
          if (value[0].toUpperCase() !== value[0]) {
            throw new Error("Must be capitalized.");
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["firstName", "lastName", "hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};