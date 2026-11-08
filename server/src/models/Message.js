const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Message = sequelize.define('Message', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: { msg: 'Name is required' } },
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { isEmail: { msg: 'Email is not valid' } },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: { args: [10, 1000], msg: 'Message must be 10-1000 characters' },
    },
  },
})

module.exports = Message