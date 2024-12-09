const express = require("express");
const inventoryController = require("../Controllers/Inventory.controller");
const {
  validateCreateInventory,
  validateUpdateInventory,
  validateDeleteInventory,
  validateId,
} = require("../middlewares/Inventory.middleware");
const { authorize, validateRole } = require("../middlewares/Autherize");

const router = express.Router();

router.post(
  "/",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  validateCreateInventory,
  inventoryController.createInventory
);

router.get(
  "/location/:locationId",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  validateId,
  inventoryController.getInventoryByLocation
);

router.get(
  "/category/:categoryId",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  validateId,
  inventoryController.getInventoryByCategory
);

router.put(
  "/:id",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  validateUpdateInventory,
  inventoryController.updateInventory
);

router.delete(
  "/:id",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  validateDeleteInventory,
  inventoryController.deleteInventory
);

router.get(
  "/",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  inventoryController.getAllInventories
);

router.get(
  "/:id",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  inventoryController.getInventoryById
);

module.exports = router;
