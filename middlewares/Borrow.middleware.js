const Joi = require('joi');

const borrowSchema = Joi.object({
    user_id: Joi.string().required(),
    inventoryId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    locationId: Joi.string().required(),
    date: Joi.string().isoDate().default(""),
    status: Joi.string().valid('DIPINJAM', 'DIKEMBALIKAN').default('DIPINJAM'),
    return_date: Joi.string().isoDate().required()
});

const updateBorrowSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string(),
    inventoryId: Joi.string(),
    quantity: Joi.number().integer().min(1),
    date: Joi.string().isoDate(),
    status: Joi.string().valid('DIPINJAM', 'DIKEMBALIKAN'),
    return_date: Joi.string().isoDate()
});

const updateStatusSchema = Joi.object({
    id: Joi.string().required(),
    dateReturn: Joi.string().isoDate().required()
});

const idSchema = Joi.object({
    id: Joi.string().required()
});

const validateCreateBorrow = (req, res, next) => {
    const { error } = borrowSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateUpdateBorrow = (req, res, next) => {
    const { error } = updateBorrowSchema.validate({
        id: req.params.id,
        userId: req.body.userId,
        inventoryId: req.body.inventoryId,
        quantity: req.body.quantity,
        date: req.body.date,
        status: req.body.status,
        dateReturn: req.body.dateReturn
    });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateBorrowId = (req, res, next) => {
    const { error } = idSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateChangeStatus = (req, res, next) => {
    const { error } = updateStatusSchema.validate({id: req.body.id, dateReturn: req.body.dateReturn});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateDeleteBorrow = (req, res, next) => {
    const { error } = idSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validateid = (req, res, next) => {
    const { error } = idSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateCreateBorrow,
    validateUpdateBorrow,
    validateBorrowId,
    validateChangeStatus,
    validateDeleteBorrow,
    validateid
};