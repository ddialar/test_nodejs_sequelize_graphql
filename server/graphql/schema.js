import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import db from '../sequelize/db';

const User = new GraphQLObjectType({
  name: 'user',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(user) {
          return user.id;
        },
      },
      firstname: {
        type: GraphQLString,
        resolve(user) {
          return user.firstname;
        },
      },
      lastname: {
        type: GraphQLString,
        resolve(user) {
          return user.lastname;
        },
      },
      email: {
        type: GraphQLString,
        resolve(user) {
          return user.email;
        },
      },
    };
  },
});

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

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLInt,
          },
          firstname: {
            type: GraphQLString,
          },
          lastname: {
            type: GraphQLString,
          },
          email: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return db.models.user.findAll({ where: args });
        },
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(root, args) {
          return db.models.post.findAll({ where: args });
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields() {
    return {
      addPerson: {
        type: User,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        resolve(source, args) {
          return db.models.user.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase(),
          });
        },
      },
      addPost: {
        type: Post,
        args: {
          userId: {
            type: GraphQLNonNull(GraphQLInt),
          },
          title: {
            type: GraphQLNonNull(GraphQLString),
          },
          content: {
            type: GraphQLNonNull(GraphQLString),
          },
        },
        resolve(source, args) {
          return db.models.user.findById(args.userId).then((user) => {
            return user.createPost({
              title: args.title,
              content: args.content,
            });
          });
        },
      },
    };
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default schema;
