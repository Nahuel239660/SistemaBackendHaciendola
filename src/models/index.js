const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Product = require('./product')(sequelize, Sequelize.DataTypes);

// Relaciones
// Ejemplo: cada usuario puede tener muchos productos
User.hasMany(Product, { as: 'products' });
Product.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

module.exports = {
  sequelize, // La instancia de Sequelize
  User,
  Product
};
