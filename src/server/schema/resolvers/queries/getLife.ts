import { getDatabaseContext } from '../../../database';
import { GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['getLife'] = async (root, { id }, context, info) => {
    const { collections } = await getDatabaseContext();

    return collections.lives.findOne({ _id: id });
};

export default query;
