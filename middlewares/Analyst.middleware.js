const Joi = require('joi');

const validateGetBorowByDayStartAndEnd = (req, res, next) => {
    const schema = Joi.object({
        start: Joi.string().isoDate().required(),
        end: Joi.string().isoDate().required(),
        inventoryId: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateGetCategoryBorrowByDayStartAndEnd = (req, res, next) => {
    const schema = Joi.object({
        start: Joi.string().isoDate().required(),
        end: Joi.string().isoDate().required(),
        categoryId: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateGetTargetLocationBorrowByDayStartAndEnd = (req, res, next) => {
    const schema = Joi.object({
        start: Joi.string().isoDate().required(),
        end: Joi.string().isoDate().required(),
        locationId: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateGetInventoryLocationBorrowByDayStartAndEnd = (req, res, next) => {
    const schema = Joi.object({
        start: Joi.string().isoDate().required(),
        end: Joi.string().isoDate().required(),
        locationId: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateGetNotreturnBorrowByDayStartAndEnd = (req, res, next) => {
    const schema = Joi.object({
        start: Joi.string().isoDate().required(),
        end: Joi.string().isoDate().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateGetLateReturnBorrowByDayStartAndEnd = (req, res, next) => {
    const schema = Joi.object({
        start: Joi.string().isoDate().required(),
        end: Joi.string().isoDate().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateAnalysAll = (req, res, next) => {
    const schema = Joi.object({
        start: Joi.string().isoDate().required(),
        end: Joi.string().isoDate().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateGetBorowByDayStartAndEnd,
    validateGetCategoryBorrowByDayStartAndEnd,
    validateGetTargetLocationBorrowByDayStartAndEnd,
    validateGetInventoryLocationBorrowByDayStartAndEnd,
    validateGetNotreturnBorrowByDayStartAndEnd,
    validateGetLateReturnBorrowByDayStartAndEnd,
    validateAnalysAll
};