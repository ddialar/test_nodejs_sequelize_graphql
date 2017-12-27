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
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title;
        },
      },
      content: {
        type: GraphQLString,
        resolve(post) {
          return post.content;
        },
      },
      person: {
        type: User,
        resolve(post) {
          return post.getUser();
        },
      },
    };
  },
});

  export default Post;