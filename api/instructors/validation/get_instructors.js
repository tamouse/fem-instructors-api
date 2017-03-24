'use strict';

const Joi = require('joi');

// We know that the only options for sortDirection
// are 'asc' and 'desc' and for sortKey are 'id',
// 'name', and 'slug
const queryValidator = Joi.object({
    sortDirection: Joi.string().valid(['asc', 'desc']),
    sortKey: Joi.string().valid(['id', 'name', 'slug']),
    quah: Joi.string()
});

module.exports = { queryValidator };

// There's an option to convert strings to upper or lower case if necessary

// The keys on the object passed into Joi.object() is a whitelist of parameters