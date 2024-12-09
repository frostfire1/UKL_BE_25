const Joi = require('joi');

const inventorySchema = Joi.object({
    name: Joi.string().required(),
    locationId: Joi.string().required(),
    categoryId: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required()
});

const UpdateSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    locationId: Joi.string(),
    categoryId: Joi.string(),
    quantity: Joi.number().integer().min(0)
});

const idScema = Joi.object({
    id: Joi.string().required()
});

const validateCreateInventory = (req, res, next) => {
    const { error } = inventorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateUpdateInventory = (req, res, next) => {
    const { error } = UpdateSchema.validate({
        id: req.params.id,
        name: req.body.name,
        locationId: req.body.locationId,
        categoryId: req.body.categoryId,
        quantity: req.body.quantity
    });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateDeleteInventory = (req, res, next) => {
    const { error } = idScema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateGetInventory = (req, res, next) => {
    const { error } = idScema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateId = (req, res, next) => {
    const { error } = idScema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
module.exports = {
    validateCreateInventory,
    validateUpdateInventory,
    validateDeleteInventory,
    validateGetInventory,
    validateId
};