
const joi = require('@hapi/joi');

const UserCreate = joi.object({

    name   :joi.string().required(),
    email  :joi.string().email().required().lowercase(),
    contact:joi.number().required(),
    amount :joi.number().required(),
    address:joi.string().required().lowercase()

});
const UserUpdate = joi.object({

    name   :joi.string().optional(),
    email  :joi.string().email().optional().lowercase(),
    contact:joi.number().optional(),
    amount :joi.number().optional(),
    address:joi.string().optional().lowercase()

});

module.exports = {UserCreate,UserUpdate};