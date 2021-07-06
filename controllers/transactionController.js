
const HttpErrors = require('http-errors');
const { Sequelize , Op, QueryTypes} = require('sequelize');

// importing validations
   const TransactionValidation = require('./../validations/transactionValidation');

// importing userService 
   const userService = require('./../services/userService');

// importing models 
   const TrasactionModel = require('./../models/transactionModel');
   const UserModel       = require('./../models/usersModel');
   const sequelize       = require('./../config/db.config') ;


module.exports = {

CreateTransaction:async(req,res,next)=>{

    
 const data = await TransactionValidation.validateAsync(req.body);

 const newTransaction = { amount:data.amount};
 
 let SenderAmount = '';
 let ReciverAmount = '';

 const SenderNoCheck = await userService.IsPhoneNoExist(data.senderNo);

  if(SenderNoCheck)
  {

      if(SenderNoCheck.amount < data.amount)
      {
          return next(new HttpErrors.BadRequest('Transaction failed due to insufficent balance'));
      }

       SenderAmount = SenderNoCheck.amount - data.amount;

      newTransaction.senderName = SenderNoCheck.name;
      newTransaction.SenderId = SenderNoCheck.uid;
   
  }else{
      return next(new HttpErrors.BadRequest('Invalid Sender Phone No'));
  }


 const ReceiverNoCheck = await userService.IsPhoneNoExist(data.reciverNo);

 if(ReceiverNoCheck)
 {
     newTransaction.reciverName =ReceiverNoCheck.name;
     newTransaction.ReciverId =ReceiverNoCheck.uid;
     ReciverAmount = ReceiverNoCheck.amount + data.amount;

 }else{
     return next(new HttpErrors.BadRequest('Invalid Receiver Phone No'));
 }

 
 const UpdateSenderbalance =await  userService.UpdateSingleUserAmount(SenderNoCheck.uid,{amount:SenderAmount});
 const UpdateReciverbalance =await userService.UpdateSingleUserAmount(ReceiverNoCheck.uid,{amount:ReciverAmount});

 TrasactionModel.
 create(newTransaction ).
 then((data)=>{
     console.log(data);
   return  res.json({'status':'200','message':'Amount Transfered Succesfully'});
 }).
 catch((e)=>{
     next(e);
 });

}
,

FetchAll:async(req,res,next)=>{

  const data = await TrasactionModel.findAll();

  return res.json({'status':'200','message':'Success','data':data});

},

FetchSingle:async(req,res,next)=>{

  const uid = req.params.id;
  const data= await TrasactionModel.findAll({ 
     order:[
         ['tid']
     ] 
    ,where :{ 
      [Op.or]:{ 
          SenderId:uid,
          ReciverId:uid
      } 
    
    }  });

  return res.json({'status':'200','message':'Success','data':data});


}






}