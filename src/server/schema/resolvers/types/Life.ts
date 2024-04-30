import { GraphQLLifeResolvers } from '../definitions';

const LifeGraphQL: GraphQLLifeResolvers = {
    fullName: root => `${root.firstName} ${root.lastName}`,
    id: root => root._id,
};

export default LifeGraphQL;
