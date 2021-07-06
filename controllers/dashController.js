
const HttpErrors = require('http-errors');
const { Sequelize ,Op,QueryTypes } = require('sequelize');

const sequelize = require('./../config/db.config');

// importing models 

const UserModel = require('./../models/usersModel');
const TransactionModel = require('./../models/transactionModel');


module.exports = {


MainDash:async(req,res,next)=>{



const totalUsers = await UserModel.count('uid');
const totalAmount = await UserModel.sum('Amount');
const totalTransactions = await TransactionModel.sum('tid');
      
res.json({totalAmount,totalUsers,totalTransactions});






}
,

UserDash:async(req,res,next)=>{

  const uid = req.params.id;

  const data = await sequelize.query(`SELECT 
               SUM( case when SenderId = :sid then Amount end )
               As DebitedAmount  ,
               SUM( case when ReciverId = :sid then Amount end )
               As CreditedAmount 
               FROM Transaction  `,
  { type: sequelize.QueryTypes.SELECT
   ,
   model:TransactionModel,
   replacements:{ sid:uid}
 
  }
  );
 
  const TotalDebit = await TransactionModel.sum('amount',{
    where:{
      SenderId:uid
    }
  })
  const totalAmount = await UserModel.sum('amount',{
    where:{
      uid:uid
    }
  });
  const TotalCredit = await TransactionModel.sum('amount',{
    where:{
      ReciverId:uid
    }
  })

   res.json({ TotalDebit, TotalCredit, totalAmount });





}

}


