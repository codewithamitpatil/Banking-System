
const express     = require('express');
const dotenv      = require('dotenv');
const cors        = require('cors');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const multer      = require('multer');
const helmet      = require('helmet');
const HttpErrors  = require('http-errors');

// including global config file 
   dotenv.config();

   const PORT = process.env.PORT || 3000;

 
// includes db connection
   // const db = require('./config/db.config');
   require('./config/dbSync');

// including global error handler
   const errorHandler = require('./errors/errorHandler');
   

// including routes   
   const UserRoute         = require('./routes/users'); 
   const DashRoute         = require('./routes/dashboard');
   const TransactionRoute  = require('./routes/transaction');
   const UnhandledRoute    = require('./errors/404Page');



// intialize express app
   const app = express();

// cors mechanisam 
   app.use('*',cors());

// to protect xxs attack
   app.use(helmet());

// for logging each request 
   app.use(morgan('dev'));
   
// for json parsing
   app.use(bodyParser.json());
   
// for url encoded data parsing
   app.use(bodyParser.urlencoded({extended:true}));
   
// for form data or multipart data parsing
   app.use(multer().array());

   

// for dashboard route
   app.use('/Dash',DashRoute);
// for user route
   app.use('/User',UserRoute);
// for Transaction route
   app.use('/Transaction',TransactionRoute);

// for 404 page handler   
   app.all('*',UnhandledRoute.Response);   


   
// home route
   app.get('',async(req,res,next)=>{
        
       res.send('hi welcome home');

   });



// global error handler
   app.use(errorHandler.ErrorResponse); 


// start server
   app.listen(PORT,()=>{
       console.log(`Server is listening on port ${PORT}`);
   });

   process.on('unhandledRejection', (reason, promise) => {
      console.log('Unhandled Rejection at:', promise, 'reason:', reason);
      // Application specific logging, throwing an error, or other logic here
    });

