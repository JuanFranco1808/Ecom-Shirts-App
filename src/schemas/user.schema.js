const Joi = require('joi');

const id = Joi.number()
const username = Joi.string().min(3).max(255)
const email = Joi.string().min(10).max(255)
const password = Joi.string().min(3).max(255)

const createSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
});

const updateSchema = Joi.object({
    username: username.optional(),
    email: email.optional(),
    password: password.optional(),
});

const getSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createSchema,
    updateSchema,
    getSchema
}