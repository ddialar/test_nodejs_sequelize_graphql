import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

const User = new GraphQLObjectType({
    name: 'user',
    fields: () => {
      return {
        id: {
          type: GraphQLInt,
          resolve(user) {
            return user.id;
          }
        },
        firstname: {
          type: GraphQLString,
          resolve(user) {
            return user.firstname;
          }
        },
        lastname: {
          type: GraphQLString,
          resolve(user) {
            return user.lastname;
          }
        },
        email: {
          type: GraphQLString,
          resolve(user) {
            return user.email;
          }
        },
      };
    }
  });

  export default User;