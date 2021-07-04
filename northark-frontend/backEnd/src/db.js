require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

const Sequelize = require ('sequelize');
const sequelize = new Sequelize('eg_database_dev', DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: 5432,
    dialect: 'postgres'
} );

// const sequelize = new Sequelize('postgres://xiangsong:LTR1gypsy@localhost/pgtestdb')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully!.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize };