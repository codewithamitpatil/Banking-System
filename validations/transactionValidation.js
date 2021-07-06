const joi = require('@hapi/joi');

const TransactionCreate = joi.object({

    senderNo:joi.string().required(),
    reciverNo:joi.string().required(),
    amount :joi.number().required()
 
});

module.exports = TransactionCreate;