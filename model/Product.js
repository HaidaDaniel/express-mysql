const { DataTypes } = require('sequelize')
const db = require('../db')

const Product = db.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  ratingRate: {
    type: DataTypes.FLOAT
  },
  ratingCount: {
    type: DataTypes.INTEGER
  }
})

module.exports = Product
