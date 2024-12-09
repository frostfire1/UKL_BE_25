const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().required()
});


const idScema = Joi.object({
    id: Joi.string().required(),
});

const validateCreateCategory = (req, res, next) => {
    const { error } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

const validateDeleteCatefory = (req, res, next) => {
    const { error } = idScema.validate(req.params);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

const validateid = (req, res, next) => {
    const { error } = idScema.validate(req.params);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};
module.exports = {validateCreateCategory, validateDeleteCatefory, validateid};