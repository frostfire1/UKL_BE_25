const express = require("express");
const UserController = require("../Controllers/User.controller");
const UserMiddleware = require("../middlewares/User.Middleware");
const auth = require("../middlewares/Autherize");

const router = express.Router();
router.use(express.json());
router.get(
  "/user/:id",
  auth.authorize,
  UserMiddleware.validateGetUser,
  UserController.getUser
);
router.post(
  "/user",
  auth.authorize,
  auth.validateRole(["ADMIN"]),
  UserMiddleware.validateCreateUser,
  UserController.createUser
);
router.put(
  "/user/:id",
  auth.authorize,
  UserMiddleware.validateEditUser,
  UserController.updateUser
);
router.delete(
  "/user/:id",
  auth.authorize,
  UserMiddleware.validateDeleteUser,
  UserController.deleteUser
);
router.get(
  "/users",
  auth.authorize,
  auth.validateRole(["ADMIN", "OPERATOR"]),
  UserController.getAllUsers
);

module.exports = router;
