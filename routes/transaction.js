
const express = require('express');
const router  = express.Router();


// includes asynHandler middleware
   const asyncHandler = require('./../middlewares/asyncMiddleware');

// import transaction controller
   const TransactionController = require('./../controllers/transactionController');   


// create transaction
   router.post('/create',asyncHandler(TransactionController.CreateTransaction));   

// get all transactions
   router.get('/allTransactions',asyncHandler(TransactionController.FetchAll));

// get particular user transactions
   router.get('/getSingleUserTransactions/:id',asyncHandler(TransactionController.FetchSingle));
   
 
// exporting routes
   module.exports = router;


















