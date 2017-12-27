import { GraphQLList } from 'graphql';
import { Post } from '../../models';

const getPosts = {
    type: new GraphQLList(Post),
    async resolve() {
        return await context.database.getAllPosts();
    },
};

export default getPosts;