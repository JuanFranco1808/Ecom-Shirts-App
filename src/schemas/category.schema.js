const Joi = require('joi');

const id = Joi.number()
const name = Joi.string().min(1).max(255)
const description = Joi.string().min(1).max(255)

const createSchema = Joi.object({
    name: name.required(),
    description: description.required(),

});

const updateSchema = Joi.object({
    name: name.optional(),
    description: description.optional(),
});

const getSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createSchema,
    updateSchema,
    getSchema
}