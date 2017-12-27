import {
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import User from '../../models';

const addPerson = {
    type: User,
    args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
        args.email = args.email.toLowerCase();
        return await context.database.createANewUser(args);
    }
};

export default addPerson;