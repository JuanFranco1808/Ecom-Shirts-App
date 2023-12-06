const Joi = require('joi');

const id = Joi.number()
const name = Joi.string().min(3).max(255)
const lastName = Joi.string().min(3).max(255)
const email = Joi.string().min(5).max(255)
const address = Joi.string().min(5).max(100)
const date = Joi.date()

const createSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    email: email.required(),
    address: address.required(),
    date: date.required(),
});

const updateSchema = Joi.object({
    name: name.optional(),
    lastName: lastName.optional(),
    email: email.optional(),
    address: address.optional(),
    date: date.optional(),
});

const getSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createSchema,
    updateSchema,
    getSchema
}