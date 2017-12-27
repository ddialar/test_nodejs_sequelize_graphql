import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import Post from '../../models';

const addPost = {
    type: Post,
    args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args, context) {
        return await context.database.createANewPost(args);
    }
};

export default addPost;