
const sequelize   = require('./db.config');

const User        = require('./../models/usersModel');
const Transaction = require('./../models/transactionModel');

User.hasMany(Transaction,{foreignKey :'SenderId'});
Transaction.belongsTo(User, {
  foreignKey: "SenderId"
});

User.hasMany(Transaction,{foreignKey :'ReciverId'});
Transaction.belongsTo(User, {
  foreignKey: "ReciverId"
});


sequelize.
sync({force:false}).
then((data)=>{
  console.log('tables created successfully');

}).catch(e =>{
    console.log('error =',e);
});



