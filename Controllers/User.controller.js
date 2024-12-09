const UserQueries = require("../queries/User.query");
const hash = require("../Utils/Hash");
const JWT = require("../Utils/JWT");
class UserController {
  static async loginUser(req, res) {
    try {
      const body = req.body;
      const user = await UserQueries.getUserByName(body.name);
      if (user) {
        if (hash.verifyPassword(req.body.password, user.password)) {
          const payload = { id: user.id, role: user.role };
          const token = JWT.generateToken(payload);
          res.status(200).json({
            status: "success",
            message: "Login berhasil",
            token: token,
          });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res
        .status(500)
        .json({
          message: "Error fetching user",
          error: error.message || error,
        });
    }
  }
  static async findUserbyName(req, res) {
    try {
      const user = await UserQueries.searchUserByName(req.params.name);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserQueries.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }

  static async createUser(req, res) {
    try {
      const body = req.body;
      const newUser = await UserQueries.createUser(
        body.name,
        hash.hashPassword(body.password),
        body.role
      );
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        message: "Error creating user",
        error: error.message || error,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await UserQueries.updateUser(req.params.id, req.body);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }

  static async deleteUser(req, res) {
    try {
      const rowsDeleted = await UserQueries.deleteUser(req.params.id);
      if (rowsDeleted) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }
  static async getUser(req, res) {
    try {
      const user = await UserQueries.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }
}

module.exports = UserController;
