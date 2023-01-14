const { Sequelize } = require("sequelize");
const config = require('config');

// console.log(get('database.name'));

const sequelize = new Sequelize(config.get("database.name"), config.get("database.user"), config.get('database.password'), {
  host: "localhost",
  dialect:
    config.get("database.type") /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
