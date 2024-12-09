const express = require("express");
const BorrowController = require("../Controllers/borrow.controller");
const BorrowMiddleware = require("../middlewares/Borrow.middleware");
const { authorize, validateRole } = require("../middlewares/Autherize");

const router = express.Router();
router.use(express.json());
router.get(
  "/borrow/:id",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowMiddleware.validateBorrowId,
  BorrowController.getBorrowById
);
router.get(
  "/borrow/user/:userId",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getBorrowByUserId
);
router.get(
  "/borrow/inventory/:inventoryId",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getBorrowByInventoryId
);
router.get(
  "/borrow/date",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getBorrowByDate
);
router.get(
  "/borrow/return-date",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getBorrowByReturnDate
);
router.get(
  "/borrow/status/:status",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getBorrowByStatus
);
router.get(
  "/borrow/category/:categoryId",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getBorrowByCategoryId
);
router.get(
  "/borrow/group/:groupId",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getBorrowByGroupId
);
router.get(
  "/borrow/location/:locationId",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getBorrowsByLocationId
);
router.get(
  "/borrow",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowController.getAllBorrows
);
router.post(
  "/borrow",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowMiddleware.validateCreateBorrow,
  BorrowController.createBorrow
);
router.put(
  "/borrow/:id",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowMiddleware.validateUpdateBorrow,
  BorrowController.updateBorrow
);
router.delete(
  "/borrow/:id",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowMiddleware.validateDeleteBorrow,
  BorrowController.deleteBorrow
);
router.post(
  "/return",
  authorize,
  validateRole(["ADMIN", "OPERATOR"]),
  BorrowMiddleware.validateChangeStatus,
  BorrowController.returnBorrow
);

module.exports = router;
