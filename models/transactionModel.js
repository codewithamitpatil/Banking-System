
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = require('../config/db.config');

const Transaction = sequelize.define("Transaction",{

    tid:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    senderName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    reciverName:{
      type:Sequelize.STRING,
      allowNull:false
    },
    amount:{
      type:Sequelize.INTEGER,
      allowNull:false
    }
    ,
    createdAt:{
      type:DataTypes.DATEONLY,
       allowNull:false,
       defaultValue:Sequelize.NOW
  
    }
  
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: false
  });
  
  module.exports = Transaction;