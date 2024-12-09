const Joi = require('joi');



const validateCreateUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('ADMIN', 'SISWA', 'OPERATOR').required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

const validateEditUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        password: Joi.string().min(6)
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

const validateDeleteUser = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

const validateGetUser = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

const validateFindUserByName = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

const validateLogin = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

module.exports = {
    validateCreateUser,
    validateEditUser,
    validateDeleteUser,
    validateGetUser,
    validateFindUserByName,
    validateLogin
};