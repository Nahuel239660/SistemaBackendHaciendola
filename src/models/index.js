const Sequelize = require('sequelize');
const sequelize = require('../config/database');  // Asegúrate de que la ruta es correcta

const User = require('./user');
const Product = require('./product');

// Establecer relaciones
User.hasMany(Product, {
  foreignKey: 'userId',
  as: 'products'
});

Product.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

module.exports = {
  sequelize,  
  User,
  Product
};
