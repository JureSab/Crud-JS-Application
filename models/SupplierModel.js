const {DataTypes} = require('sequelize')
const db = require('../config/dbConn')

const Supplier = db.define('Supplier', {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adress: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.INTEGER
    }
},{timestamps: true})

module.exports = Supplier