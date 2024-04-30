import { ObjectId } from 'mongodb';
import { getDatabaseContext } from '../../../database';
import { GraphQLMutationResolvers } from '../definitions';

const mutation: GraphQLMutationResolvers['createLife'] = async (_, { input }, __) => {
    const { firstName, lastName, hobbies, birthday, description, title } = input;
    const { collections } = await getDatabaseContext();

    const operation = await collections.lives.insertOne({
        _id: new ObjectId(),
        firstName,
        lastName,
        hobbies,
        birthday,
        description,
        title,
    });

    return collections.lives.findOne({ _id: operation.insertedId });
};

export default mutation;
