const InventoryQuery = require('../queries/Inventory.query.js');

class InventoryController {
    static async getAllInventories(req, res) {
        try {
            const inventories = await InventoryQuery.getAllInventory();
            res.status(200).json(inventories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getInventoryById(req, res) {
        try {
            const inventory = await InventoryQuery.getInventoryById(req.body.id);
            if (inventory) {
                res.status(200).json(inventory);
            } else {
                res.status(404).json({ message: 'Inventory not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createInventory(req, res) {
        try {
            const newInventory = await InventoryQuery.createInventory(req.body);
            res.status(201).json(newInventory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateInventory(req, res) {
        try {
            const updatedInventory = await InventoryQuery.updateInventory(req.params.id, req.body);
            if (updatedInventory) {
                res.status(200).json(updatedInventory);
            } else {
                res.status(404).json({ message: 'Inventory not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getInventoryByCategory(req, res) {
        try {
            const inventory = await InventoryQuery.getInventoryByCategory(req.params.categoryId);
            if (inventory) {
                res.status(200).json(inventory);
            } else {
                res.status(404).json({ message: 'Inventory not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getInventoryByLocation(req, res) {
        try {
            const inventory = await InventoryQuery.getInventoryByLocation(req.params.locationId);
            if (inventory) {
                res.status(200).json(inventory);
            } else {
                res.status(404).json({ message: 'Inventory not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteInventory(req, res) {
        try {
            const deletedInventory = await InventoryQuery.deleteInventory(req.params.id);
            if (deletedInventory) {
                res.status(200).json({ message: 'Inventory deleted successfully' });
            } else {
                res.status(404).json({ message: 'Inventory not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = InventoryController;