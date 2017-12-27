import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import User from './user.type';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Blog post',
  fields() {
    return {
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      person: {
        type: User,
        resolve(parentValues, _, context) {
          // TODO: Use the context.database interface in order to get the User data for this Post.
        },
      },
    };
  },
});

  export default Post;