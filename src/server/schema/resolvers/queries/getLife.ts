import { getDatabaseContext } from '../../../database';
import { GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['getLife'] = async (root, { id }, context, info) => {
    const { collections } = await getDatabaseContext();

    // Fetch the documents as an array
    const life = await collections.lives.findOne({ _id: id });
    // Transform each MongoDB document to match the GraphQLLife type
    const transformedLives = {
        ...life,
        id: life._id,
        fullName: `${life.firstName} ${life.lastName}`, // Dynamically create fullName
    };

    return transformedLives;
};

export default query;
