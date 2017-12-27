import { GraphQLObjectType } from 'graphql';

import * as PeopleMutations from './people';
import * as PostsMutations from './posts';

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields: () => ({
        addPerson: PeopleMutations.addPerson,
        addPost: PostsMutations.addPost
    })
});

export default Mutation;