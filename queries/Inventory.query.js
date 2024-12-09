const prisma = require('../Utils/Prisma');

async function getAllInventory() {
    return await prisma.inventory.findMany();
}

async function getInventoryById(id) {
    if (!id) {
        throw new Error('Invalid or missing `id` parameter.');
    }
    return await prisma.inventory.findUnique({
        where: { id: id },
    });
}

async function createInventory(data) {
    return await prisma.inventory.create({
        data: data,
    });
}

async function getInventorybyLocation(locationId) {
    return await prisma.inventory.findMany({
        where: { locationId: locationId },
    });
}

async function getInventorybyCategory(categoryId) {
    return await prisma.inventory.findMany({
        where: { categoryId: categoryId
        },
    });
}

async function getInventorybyGroup(groupId) {
    return await prisma.inventory.findMany({
        where: { groupId: groupId },
    });
}

async function updateInventory(id, data) {
    return await prisma.inventory.update({
        where: { id: id },
        data: data,
    });
}

async function deleteInventory(id) {
    return await prisma.inventory.delete({
        where: { id: id },
    });
}

module.exports = {
    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
    getInventorybyLocation,
    getInventorybyCategory,
    getInventorybyGroup
};