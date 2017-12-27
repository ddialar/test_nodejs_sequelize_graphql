import db from '../db';

const getAllPosts = async (args) => {
    return await db.models.post.findAll({ where: args });
};

const createANewPost = async (args) => {
    let newPost;
    let postAuthor = await db.models.user.findById(args.userId);

    if (postAuthor) {
        newPost = await postAuthor.createPost({
            title: args.title,
            content: args.content
        });
    } else {
        // TODO: Implement the error handler here.
    }

    return newPost;
};

export {
    getAllPosts,
    createANewPost
};