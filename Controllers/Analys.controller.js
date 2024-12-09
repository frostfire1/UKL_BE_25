const borrowQuery = require("../queries/Borrow.query");
const { category } = require("../Utils/Prisma");
class AnalysController {
  static async getBorowByDayStartAndEnd(req, res) {
    try {
      const { start, end, inventoryId } = req.body;
      const data = { inventoryId };
      const result = await borrowQuery.getBorowByDayStartAndEnd(
        start,
        end,
        data
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCategoryBorrowByDayStartAndEnd(req, res) {
    try {
      const { start, end, categoryId } = req.body;
      const data = { categoryId };
      const result = await borrowQuery.getCategoryBorrowByDayStartAndEnd(
        start,
        end,
        data
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTargetLocationBorrowByDayStartAndEnd(req, res) {
    try {
      const { start, end, locationId } = req.body;
      const data = { locationId };
      const result = await borrowQuery.getTargetLocationBorrowByDayStartAndEnd(
        start,
        end,
        data
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getInventoryLocationBorrowByDayStartAndEnd(req, res) {
    try {
      const { start, end, locationId } = req.body;
      const data = { locationId };
      const result =
        await borrowQuery.getInventoryLocationBorrowByDayStartAndEnd(
          start,
          end,
          data
        );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getNotreturnBorrowByDayStartAndEnd(req, res) {
    try {
      const { start, end } = req.body;
      const result = await borrowQuery.getNotreturnBorrowByDayStartAndEnd(
        start,
        end
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getLateReturnBorrowByDayStartAndEnd(req, res) {
    try {
      const { start, end } = req.body;
      const result = await borrowQuery.getLateReturnBorrowByDayStartAndEnd(
        start,
        end
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async AnalysAll(req, res) {
    try {
      const { start, end } = req.body;

      const getLate = await borrowQuery.getLateReturnBorrowByDayStartAndEnd(
        start,
        end
      );
      const getMost =
        await borrowQuery.getMostBorrowedInventoryByDayStartAndEnd(start, end);

      const countMost = await borrowQuery.countBorrowByInventoryId(
        getMost.inventoryId
      );
      const countLate = await borrowQuery.countBorrowByInventoryId(
        getLate.inventoryId
      );

      res.status(200).json({
        data: {
          analyst_period: {
            start,
            end,
          },
        },
        frequently_borrowed_inventory: {
          inventory_id: getMost.inventoryId,
          category: getMost.categoryName,
          total_borrow: countMost,
        },
        inefficient_return: {
          item_id: getLate.inventoryId,
          name: getLate.inventoryName,
          total_borrow: countLate,
          total_not_return: getLate.quantity,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = AnalysController;
