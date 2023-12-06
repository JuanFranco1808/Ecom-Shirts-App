const Joi = require('joi');

const id = Joi.number()
const name = Joi.string().min(3).max(255)
const size = Joi.string().min(1).max(255)
const gender = Joi.string().min(3).max(255)
const description = Joi.string().min(1).max(100)
const price = Joi.number()

const createSchema = Joi.object({
    name: name.required(),
    size: size.required(),
    gender: gender.required(),
    description: description.required(),
    price: price.required()
});

const updateSchema = Joi.object({
    name: name.optional(),
    size: size.optional(),
    gender: gender.optional(),
    description: description.optional(),
    price: price.optional()
});

const getSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createSchema,
    updateSchema,
    getSchema
}