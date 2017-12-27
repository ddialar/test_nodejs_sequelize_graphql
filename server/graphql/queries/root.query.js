import { GraphQLObjectType } from 'graphql';

import * as PeopleQueries from './people';
import * as PostsQueries from './posts';

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => ({
        getPeople: PeopleQueries.getPeople,
        getPosts: PostsQueries.getPosts
    })
});

export default Query;