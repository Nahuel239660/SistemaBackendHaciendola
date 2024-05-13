const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT('long'), // Asegurarse de que pueda almacenar HTML largo
    allowNull: true
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false
  },
  grams: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  comparePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Product;
