
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = require('../config/db.config');

const Users = sequelize.define("Users",{

  uid:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
  },
  name:{
      type:Sequelize.STRING,
      allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false
  },
  amount:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
  ,
  contact:{
      type:Sequelize.STRING,
      allowNull:false,
      unique: true
  },
  address:{
      type:Sequelize.STRING,
     allowNull:false
  },
  createdAt:{
    type:DataTypes.DATEONLY,
     allowNull:false,
     defaultValue:Sequelize.NOW

  }

}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false,
  underscored: true
});

module.exports = Users;