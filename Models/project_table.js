const Sequelize = require('sequelize');
const sequelize = require('../Utils/database');
const Project_table = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        Unique : true
    },
    project_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    open_cost:{
        type: Sequelize.FLOAT,
        defaultValue: 5
    },
    target_opens:{
        type: Sequelize.INTEGER,
        defaultValue: 100
    },
    click_cost:{
        type: Sequelize.FLOAT,
        defaultValue: 10
    },
    target_clicks:{
        type: Sequelize.INTEGER,
        defaultValue: 50
    },
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue:1
    }
})

module.exports = Project_table;