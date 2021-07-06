
module.exports = {

ErrorResponse:async(err,req,res,next)=>{

  if(err.isJoi)
  {
      err.status = 201;
      
  }

  res.status(err.status).json({
      'status':err.status,
      'message':err.message
  });



}



}