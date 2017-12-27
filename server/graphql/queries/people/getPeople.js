import { 
    GraphQLInt,
    GraphQLString,
    GraphQLList 
} from 'graphql';
import { User } from '../../models';

const getPeople = {
    type: new GraphQLList(User),
    args: {
        id: { type: GraphQLInt },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    async resolve(root, args, context) {
        return await context.database.getAllUsers(args);
    }
};

export default getPeople;