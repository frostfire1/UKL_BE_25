const express = require('express');
const categoryController = require('../Controllers/Category.controller');
const categoryMiddleware = require('../middlewares/Category.middleware');
const { authorize, validateRole } = require('../middlewares/Autherize');

const router = express.Router();

router.use(express.json());

router.get('/', authorize, categoryController.getAllCategories);
router.get('/:id', authorize, categoryMiddleware.validateCreateCategory, categoryController.getCategoryById);
router.post('/', authorize, validateRole(['ADMIN']), categoryMiddleware.validateCreateCategory, categoryController.createCategory);
router.put('/:id', authorize, validateRole(['ADMIN']), categoryMiddleware.validateid, categoryController.updateCategory);
router.delete('/:id', authorize, validateRole(['ADMIN']), categoryMiddleware.validateid, categoryController.deleteCategory);

module.exports = router;