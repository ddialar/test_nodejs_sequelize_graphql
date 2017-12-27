import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

const User = new GraphQLObjectType({
    name: 'user',
    fields: () => {
      return {
        id: { type: GraphQLInt },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString }
      };
    }
  });

  export default User;