const BorrowQuery = require("../queries/Borrow.query");

class BorrowController {
  static async getBorrowById(req, res) {
    try {
      const borrow = await BorrowQuery.getBorrowbyid(req.params.id);
      res.json(borrow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByUserId(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbyuserid(req.params.userId);
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByInventoryId(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbyinventoryid(
        req.params.inventoryId
      );
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByDate(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbydate(req.body.date);
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByReturnDate(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbyreturndate(
        req.body.returnDate
      );
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByStatus(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbystatus(req.params.status);
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByCategoryId(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbyCategoryid(
        req.params.categoryId
      );
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByGroupId(req, res) {
    try {
      const borrows = await BorrowQuery.Borrowbygroupid(req.params.groupId);
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowsByLocationId(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowByLocationId(
        req.params.locationId
      );
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllBorrows(req, res) {
    try {
      const borrows = await BorrowQuery.getAllBorrows();
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createBorrow(req, res) {
    try {
      const borrow = await BorrowQuery.createBorrow(req.body);
      res.json(borrow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBorrow(req, res) {
    try {
      const borrow = await BorrowQuery.updateBorrow(req.params.id, {
        userId: req.body.userId,
        inventoryId: req.body.inventoryId,
        quantity: req.body.quantity,
        status: req.body.status,
        dateReturn: req.body.dateReturn,
      });
      res.json(borrow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBorrow(req, res) {
    try {
      const borrow = await BorrowQuery.deleteBorrow(req.params.id);
      res.json(borrow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByInventoryId(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbyinventoryid(
        req.params.inventoryId
      );
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByUserId(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbyuserid(req.params.userId);
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByDate(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbydate(req.params.date);
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByReturnDate(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbyreturndate(
        req.params.returnDate
      );
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByStatus(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbystatus(req.params.status);
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async returnBorrow(req, res) {
    try {
      const borrow = await BorrowQuery.returnBorrow(
        req.body.id,
        req.body.dateReturn
      );
      res.json(borrow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByCategoryId(req, res) {
    try {
      const borrows = await BorrowQuery.getBorrowbyCategoryid(
        req.params.categoryId
      );
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBorrowByGroupId(req, res) {
    try {
      const borrows = await BorrowQuery.getBorowByDayStartAndEnd(req.body.start_date, req.body.end_date, req.body.data);
      res.json(borrows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async usageReport(req, res) {
    try {
      const report = await BorrowQuery.usageReport(req.body);
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BorrowController;
