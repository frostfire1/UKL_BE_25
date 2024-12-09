const Joi = require('joi');

const locationSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required()
});

const idScema = Joi.object({
    id: Joi.string().required()
});

const validateCreateLocation = (req, res, next) => {
    const { error } = locationSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

const validateid = (req, res, next) => {
    const { error } = idScema.validate(req.params);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

module.exports = { validateCreateLocation, validateid};