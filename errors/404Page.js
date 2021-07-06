
module.exports = {

 Response:async(req,res,next)=>{
  return   res.status(404).json({
       'status':404,
       'message':'Request page not found'
     });
     
 }


}