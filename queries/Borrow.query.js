const { date } = require("joi");
const prisma = require("../Utils/Prisma");
const inv = require("./Inventory.query");

const getBorrowbyid = async (id) => {
  return await prisma.borrow.findUnique({
    where: { id: id },
  });
};

const getBorrowbystatus = async (ststus) => {
  return await prisma.borrow.findMany({
    where: { status: ststus },
  });
};

const getBorrowbyinventoryid = async (inventoryId) => {
  return await prisma.borrow.findMany({
    where: { inventoryId: inventoryId },
  });
};

const getBorrowbyuserid = async (userId) => {
  return await prisma.borrow.findMany({
    where: { userId: userId },
  });
};

const getBorrowbyCategoryid = async (categoryId) => {
  return await prisma.borrow.findMany({
    where: { inventory: { category: { id: categoryId } } },
  });
};

const getBorrowByLocationId = async (locationId) => {
  return await prisma.borrow.findMany({
    where: { locationId: locationId },
  });
};

const Borrowbygroupid = async (groupId) => {
  return await prisma.borrow.findMany({
    where: { inventory: { group: { id: groupId } } },
  });
};

const getBorrowbydate = async (date) => {
  return await prisma.borrow.findMany({
    where: { borrow_date: date },
  });
};

const getBorrowbyreturndate = async (returnDate) => {
  return await prisma.borrow.findMany({
    where: { return_date: returnDate },
  });
};

const getAllBorrows = async () => {
  return await prisma.borrow.findMany();
};

const createBorrow = async (data) => {
  const formattedReturnDate = new Date(data.return_date).toISOString();

  const existingBorrow = await prisma.borrow.findUnique({
    where: { user_id: data.user_id },
  });

  if (existingBorrow) {
    return "User has already borrowed an item.";
  }

  const createborrow = await prisma.borrow.create({
    data: {
      user_id: data.user_id,
      inventoryId: data.inventoryId,
      quantity: data.quantity,
      locationId: data.locationId,
      return_date: formattedReturnDate,
    },
  });

  if (createborrow) {
    const inventory = await inv.getInventoryById(createborrow.inventoryId);
    if (!inventory) {
      return inventory;
    }
    if (inventory.quantity - data.quantity < 0) {
      return "Inventory out of stock for that quantity";
    }
    const updateInventory = await prisma.inventory.update({
      where: { id: createborrow.inventoryId },
      data: {
        quantity: inventory.quantity - data.quantity,
      },
    });
    if (!updateInventory) {
      return updateInventory;
    }
  }
  return createborrow;
};
const getBorowByDayStartAndEnd = async (start, end, data) => {
  return await prisma.borrow.findMany({
    where: {
      borrow_date: {
        gte: new Date(start).toISOString(),
        lte: new Date(end).toISOString(),
      },
      inventoryId: data.inventoryId,
    },
  });
};

const getCategoryBorrowByDayStartAndEnd = async (start, end, data) => {
  return await prisma.borrow.findMany({
    where: {
      borrow_date: {
        gte: new Date(start).toISOString(),
        lte: new Date(end).toISOString(),
      },
      inventory: { category: { id: data.categoryId } },
    },
  });
};

const getTargetLocationBorrowByDayStartAndEnd = async (start, end, data) => {
  return await prisma.borrow.findMany({
    where: {
      borrow_date: {
        gte: new Date(start).toISOString(),
        lte: new Date(end).toISOString(),
      },
      locationId: data.locationId,
    },
  });
};

const getInventoryLocationBorrowByDayStartAndEnd = async (start, end, data) => {
  return await prisma.borrow.aggregate({
    where: {
      borrow_date: {
        gte: new Date(start).toISOString(),
        lte: new Date(end).toISOString(),
      },
      inventory: { location: { id: data.locationId } },
    },
  });
};

const getMostBorrowedInventoryByDayStartAndEnd = async (start, end) => {
  const groupedBorrows = await prisma.borrow.groupBy({
    by: ['inventoryId'],
    where: {
      borrow_date: {
        gte: new Date(start).toISOString(),
        lte: new Date(end).toISOString(),
      },
    },
    _count: {
      inventoryId: true,
    },
    orderBy: {
      _count: {
        inventoryId: 'desc',
      },
    },
    take: 1,
  });

  if (groupedBorrows.length === 0) {
    return null;
  }

  const topBorrow = groupedBorrows[0];

  
  const inventory = await prisma.inventory.findUnique({
    where: {
      id: topBorrow.inventoryId,
    },
    include: {
      category: true,
    },
  });

  return {
    inventoryId: topBorrow.inventoryId,
    totalBorrow: topBorrow._count.inventoryId,
    inventoryName: inventory ? inventory.name : null,
    categoryName: inventory && inventory.category ? inventory.category.name : null,
  };
};

const countBorrowByInventoryId = async (inventoryId) => {
  return await prisma.borrow.count({
    where: {
      inventoryId: inventoryId,
    },
  });
};

const getNotreturnBorrowByDayStartAndEnd = async (start, end) => {
  return await prisma.borrow.findMany({
    where: {
      borrow_date: {
        gte: start,
        lte: end,
      },
      return_date: null,
    },
  });
};

const getLateReturnBorrowByDayStartAndEnd = async (start, end) => {
  return await prisma.borrow.findMany({
    where: {
      borrow_date: {
        gte: new Date(start).toISOString(),
        lte: new Date(end).toISOString(),
      },
      true_return_date: {
        gt: prisma.borrow.fields.return_date,
      },
    },
    select: {
      inventoryId: true,
      _count: true,
    },
  });
};
const updateBorrow = async (id, data) => {
  return await prisma.borrow.update({
    where: { id: id },
    data: data,
  });
};

const returnBorrow = async (id, return_data) => {
  console.log(return_data);
  const returnDate = new Date(return_data);
  if (isNaN(returnDate.getTime())) {
    return { error: "Invalid time value" };
  }

  const returnborrow = await updateBorrow(id, {
    status: "DIKEMBALIKAN",
    true_return_date: returnDate.toISOString(),
  });
  if (returnborrow) {
    const inventory = await inv.getInventoryById(returnborrow.inventoryId);
    if (!inventory) {
      return inventory;
    }
    const updateInventory = await prisma.inventory.update({
      where: { id: returnborrow.inventoryId },
      data: {
        quantity: inventory.quantity + returnborrow.quantity,
      },
    });
    if (!updateInventory) {
      return updateInventory;
    }
  }
  return returnborrow;
};

const deleteBorrow = async (id) => {
  return await prisma.borrow.delete({
    where: { id: id },
  });
};

module.exports = {
  getBorrowbyid,
  getAllBorrows,
  createBorrow,
  updateBorrow,
  deleteBorrow,
  getBorrowbyinventoryid,
  getBorrowbyuserid,
  getBorrowbydate,
  getBorrowbyreturndate,
  getBorrowbystatus,
  returnBorrow,
  getBorrowbyCategoryid,
  Borrowbygroupid,
  getBorrowByLocationId,
  getBorowByDayStartAndEnd,
  getCategoryBorrowByDayStartAndEnd,
  getTargetLocationBorrowByDayStartAndEnd,
  getInventoryLocationBorrowByDayStartAndEnd,
  getNotreturnBorrowByDayStartAndEnd,
  getLateReturnBorrowByDayStartAndEnd,
  getMostBorrowedInventoryByDayStartAndEnd,
  countBorrowByInventoryId,
};
