const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que el nombre de usuario sea único
    validate: {
      notEmpty: { msg: "El nombre de usuario no puede estar vacío" },
      len: {
        args: [4, 20],
        msg: "El nombre de usuario debe tener entre 4 y 20 caracteres"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que el correo electrónico sea único
    validate: {
      notEmpty: { msg: "El correo electrónico no puede estar vacío" },
      isEmail: { msg: "Debe ser un correo electrónico válido" }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La contraseña no puede estar vacía" },
      len: {
        args: [6, 100],
        msg: "La contraseña debe tener al menos 6 caracteres"
      }
    }
  }
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
