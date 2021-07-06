

// importing user model
const HttpError  = require('http-errors');
const UserModel = require('./../models/usersModel');
const TransactionModel = require('./../models/transactionModel');
const { Op } = require('sequelize');

module.exports = 
{


IsPhoneNoExist:async(phone)=>{

  const check = await UserModel.findOne({ where :{ contact:phone }  });

  return (check ? check: false );
  
},

FetchSingleUser:async(uid)=>{
  const data = await UserModel.findByPk(uid);
  const TotalDebit = await TransactionModel.sum('amount',{
    where:{
      SenderId:uid
    }
  });
  const TotalAmount = await UserModel.sum('amount',{
    where:{
      uid:uid
    }
  });
  const TotalCredit = await TransactionModel.sum('amount',{
    where:{
      ReciverId:uid
    }
  })
  return {data,TotalDebit,TotalCredit,TotalAmount};                  
}
,

UpdateSingleUserAmount:async(uid,userData)=>{
  
  const data =await UserModel.
    update(userData, {
      where: { uid: uid}
    });
  
   return data;


}

    
}