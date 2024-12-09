const categoryQueries = require('../queries/Category');

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const categories = await categoryQueries.getAllCategories();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getCategoryById(req, res) {
        try {
            const categories = await categoryQueries.getCategoriesByid(req.params.id);
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getCategory(req, res) {
        try {
            const category = await categoryQueries.getCategory(req.params.id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateCategory(req, res) {
        try {
            const updatedCategory = await categoryQueries.updateCategory(req.params.id, req.body);
            if (updatedCategory) {
                res.json(updatedCategory);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async createCategory(req, res) {
        try {
            const newCategory = await categoryQueries.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const deletedCategory = await categoryQueries.deleteCategory(req.params.id);
            if (deletedCategory) {
                res.json(deletedCategory);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

module.exports = CategoryController;
