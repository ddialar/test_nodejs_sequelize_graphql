import { GraphQLSchema } from 'graphql';

import Query from './queries/root.query';
import Mutation from './mutations/mutation';

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default schema;
