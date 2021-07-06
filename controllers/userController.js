
const HttpErrors  = require('http-errors');



// importing models
   const UserModel = require('./../models/usersModel');

// importing validations
   const UserValidation = require('./../validations/userValidation');

// importing service
   const UserService = require('./../services/userService');

// exporting modules
module.exports = {


CreateUser:async(req,res,next)=>{


  const userData = await UserValidation.UserCreate.
                         validateAsync(req.body).
                         catch((e)=>{ next(new HttpErrors.BadRequest('All Fields Are Required')) });

  const doesContactExist = await UserService.IsPhoneNoExist(userData.contact);
  
  if(doesContactExist)
  {
   return  next(new HttpErrors.Conflict('Phone No Is Already Exist . Plz Try Another No.'))
  }


 UserModel.
 create(userData).
 then((item)=>{
      return res.status(200).json({ 'status':'200','message':'User Created SuccessFully.' });
  }).
 catch(err =>{
       console.log(err);
       return  next(new HttpErrors.InternalServerError());
  });


}
,    

FetchAllUsers:async(req,res,next)=>{

   const data = await UserModel.findAll();
   res.status(200).json({"status": "200",
   "message": "Success","data":data});
}
,

FetchSingleUser:async(req,res,next)=>{

  const data = await UserService.FetchSingleUser(req.params.id);

  res.status(200).json({"status": "200",
  "message": "Success","data":data['data']});

}
,

UpdateUser:async(req,res,next)=>{


const userData = await UserValidation.UserUpdate.
                         validateAsync(req.body).
                         catch((e)=>{ next(new HttpErrors.BadRequest('All Fields Are Required')) });

 UserModel.
 update(userData, {
   where: { uid: req.params.id}
 }).
 then((item)=>{
   console.log(item);
   res.send('ok');
 }).
 catch(e=>{
   console.log(e);
   next(e);
 });


}


};