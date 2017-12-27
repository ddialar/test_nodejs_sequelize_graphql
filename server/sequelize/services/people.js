import db from '../db';

const getAllUsers = async (args) => {
    return await db.models.user.findAll({ where: args });
};

const createANewUser = async (args) => {
    return await db.models.user.create({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email.toLowerCase(),
    });
};

export {
    getAllUsers,
    createANewUser
};