require('dotenv').config();
const { Sequelize } = require('sequelize');

// Asegúrate de que las variables de entorno estén definidas antes de usarlas
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true
    }
  },
  logging: console.log,
  port: 1433
});

module.exports = sequelize;
