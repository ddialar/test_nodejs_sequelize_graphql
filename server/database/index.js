import * as sequelize from '../sequelize/services';

export {
    getAllUsers: sequelize.getAllUsers,
    createANewUser sequelize.createANewUser,

    getAllPosts: sequelize.getAllPosts,
    createANewPost: sequelize.createANewPost
};