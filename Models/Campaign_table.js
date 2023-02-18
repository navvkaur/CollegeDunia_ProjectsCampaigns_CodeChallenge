const Sequelize = require('sequelize');
const sequelize = require('../Utils/database');
const Campaign_table = sequelize.define('campaign', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        Unique : true
    },
    campaign_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    opens:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    clicks:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue:1
    }
})

module.exports = Campaign_table;