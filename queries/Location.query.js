const prisma = require('../Utils/Prisma');

const getLocation = async (id) => {
    return await prisma.location.findUnique({
        where: { id: id },
    });
}

const getAllLocations = async () => {
    return await prisma.location.findMany();
}

const createLocation = async (data) => {
    return await prisma.location.create({
        data: data,
    });
}

const getLocationById = async (id) => {
    return await prisma.location.findFirst({
        where: { id: id },
    });
}

const findLocationByName = async (name) => {
    return await prisma.location.findMany({
        where: {
            name: {
                contains: name,
            },
        },
    });
}

const updateLocation = async (id, data) => {
    return await prisma.location.update({
        where: { id: id },
        data: data,
    });
}

const deleteLocation = async (id) => {
    return await prisma.location.delete({
        where: { id: id },
    });
}

module.exports = {
    getLocation,
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    findLocationByName,
    getLocationById
};