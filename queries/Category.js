const prisma = require('../Utils/Prisma');

const getCategory = async (id) => {
    return await prisma.category.findUnique({
        where: { id: id },
    });
};

const getAllCategories = async () => {
    return await prisma.category.findMany();
};

const getCategoriesByid = async (id) => {
    return await prisma.category.findUnique({
        where: { id: id },
    });
}

const createCategory = async (data) => {
    return await prisma.category.create({
        data: data,
    });
};

const findCategoryByName = async (name) => {
    return await prisma.category.findMany({
        where: {
            name: {
                contains: name,
            },
        },
    });
}

const updateCategory = async (id, data) => {
    return await prisma.category.update({
        where: { id: id },
        data: data,
    });
};

const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: { id: id },
    });
};

module.exports = {
    getCategory,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    findCategoryByName,
    getCategoriesByid
};