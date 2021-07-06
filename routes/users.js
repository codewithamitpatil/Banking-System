
const express = require('express');
const router  = express.Router();


// include async handler
   const asyncHandler   = require('../middlewares/asyncMiddleware');
 
// include user controller 
   const UserController = require('../controllers/userController');

// create user
   router.post('/create',asyncHandler(UserController.CreateUser));

// fetch all users
   router.get('/allUsers',asyncHandler(UserController.FetchAllUsers));

// fetch single user
   router.get('/singleUser/:id',asyncHandler(UserController.FetchSingleUser));
   
// update user
   router.post('/updateUser/:id',asyncHandler(UserController.UpdateUser));

 
// exporting routes
   module.exports = router;










