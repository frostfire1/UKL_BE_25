const prisma = require('../Utils/Prisma');

async function createUser(name , password, role) {
    try {
        const user = await prisma.user.create({
            data: {
                name,
                password,
                role
            }
        });
        return user;
    } catch (error) {
        throw new Error('Error creating user');
    }
}

async function getUserByName(name) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                name
            }
        });
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

async function getAllUsers() {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        throw new Error('Error fetching users');
    }
}

async function searchUserByName(name) {
    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        });
        return users;
    } catch (error) {
        throw new Error('Error finding users');
    }
}

async function deleteUser(id) {
    try {
        const user = await prisma.user.delete({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        throw new Error('Error deleting user');
    }
}

async function editUser(id, data) {
    try {
        const user = await prisma.user.update({
            where: {
                id
            },
            data
        });
        return user;
    } catch (error) {
        throw new Error('Error updating user');
    }
}

module.exports = {
    getAllUsers,
    searchUserByName,
    createUser,
    getUserByName,
    editUser,
    deleteUser
};
