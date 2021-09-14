const Sequelize = require('sequelize');

const sequelize = require('./database/connection');

module.exports = (sequelize, type) => {
    return sequelize.define('Users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        fisrtName: 
        {
            type: type.VARCHAR,

        },
        lastName: 
        {
            type: type.VARCHAR
        },
        email:
        {
            type: type.VARCHAR
        },
        mobileNumber:
        {
            type: type.VARCHAR
        },
        password: 
        {
            type: type.VARCHAR
        },
        salt: {
            type: type.VARCHAR
        },
        isActive: 
        {
            type: type.BOOLEAN
        }

    
    })
}