const Sequelize = require('sequelize');

const sequelize = new Sequelize("InfoUsers", "sql6436843", "ipZRXSRPGL", {
    host: "sql6.freesqldatabase.com",
    port: "3306",
    dialect:"mysql"
})


module.exports = sequelize;