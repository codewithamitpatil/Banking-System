
const express = require('express');
const router  = express.Router();


// including asyncHandler middleware
  const asyncHandler = require('./../middlewares/asyncMiddleware');

// importing DashController 
   const DashController = require('./../controllers/dashController');  

// get no of total users , total transactions ,total amount
   router.get('/mainDash',asyncHandler(DashController.MainDash)); 

// get no of total amount debit , total  amount credit for single user
   router.get('/userDash/:id',asyncHandler(DashController.UserDash)); 


// exporting router
   module.exports = router;
























