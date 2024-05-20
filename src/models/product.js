const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El título no puede estar vacío" }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true // Permitir nulo si no se proporciona descripción
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que el SKU sea único
    validate: {
      notEmpty: { msg: "El SKU no puede estar vacío" }
    }
  },
  grams: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Los gramos deben ser un número entero" },
      min: {
        args: [1],
        msg: "Los gramos deben ser al menos 1"
      }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "El stock debe ser un número entero" },
      min: {
        args: [0],
        msg: "El stock no puede ser negativo"
      }
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: "El precio debe ser un número decimal" },
      min: {
        args: [0.01],
        msg: "El precio debe ser al menos 0.01"
      }
    }
  },
  comparePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      isDecimal: { msg: "El precio de comparación debe ser un número decimal" }
    }
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true, // Asegura que el código de barras sea único
    validate: {
      notEmpty: { msg: "El código de barras no puede estar vacío" }
    }
  }
}, {
  sequelize,
  modelName: 'Product'
});

module.exports = Product;
