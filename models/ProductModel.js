const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/dbConn')

const Product = db.define('Product', {

  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_supp: {
    type: DataTypes.STRING
  },
  product_price: {
    type: DataTypes.INTEGER
  }
},{timestamps : true});

module.exports = Product